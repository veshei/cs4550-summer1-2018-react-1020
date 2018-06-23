import React from 'react';
import AnswerService from "../services/AnswerService";
import UserService from "../services/UserService";

/**
 * An individual item in the college answer list.
 */
export default class CollegeAnswersListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answerId: '',
            answer: {
                title: '',
                answer: '',
                user: {
                    id: '',
                    username: ''
                }
            },
            canUserDelete: false // false by default
        }
        this.answerService = AnswerService.instance;
        this.userService = UserService.instance;
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.canUserDelete = this.canUserDelete.bind(this);
    }

    /**
     * Deletes the answer in this answer list item's state from the database.
     */
    deleteAnswer() {
        this.answerService.deleteAnswer(this.state.answerId).then(() => {
            if (this.props.reloadAnswers) {
                this.props.reloadAnswers();
            }
        });
    }

    /**
     * Determines whether or not the currently logged in user, if it exists, can delete this question.
     */
    canUserDelete() {
        this.userService.getProfile().then(user => {
            if (!user) {
                this.setState({canUserDelete: false});
            } else if (user.id === this.state.answer.user.id || user.role === 'ADMIN') {
                this.setState({canUserDelete: true});
            } else {
                this.setState({canUserDelete: false});
            }
        });
    }


    componentDidMount() {
        this.setState({
            answerId: this.props.answerId
        }, () => {
            this.answerService.findAnswerById(this.props.answerId).then(answer => {
                this.setState({answer: answer});
            }).then(() => this.canUserDelete());
        });
    }

    render() {
        return <li className="list-group-item">

            {this.state.canUserDelete && <button type="button"
                                                 className="btn btn-danger float-right"
                                                 onClick={this.deleteAnswer}>
                Delete Answer
            </button>}
            <h3>{this.state.answer.title}</h3>
            <div className="author">{'by ' + this.state.answer.user.username}</div>
            <div>{this.state.answer.answer}</div>
        </li>
    }
}