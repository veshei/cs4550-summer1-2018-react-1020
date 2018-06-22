import React from 'react';
import AnswerService from "../services/AnswerService";

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
                    username: ''
                }
            }
        }
        this.answerService = AnswerService.instance;
        this.deleteAnswer = this.deleteAnswer.bind(this);
    }

    /**
     * Deletes the answer in this answer list item's state from the database.
     */
    deleteAnswer() {
        this.answerService.deleteAnswer(this.state.answerId);
    }


    componentDidMount() {
        this.setState({
            answerId: this.props.answerId
        }, () => {
            this.answerService.findAnswerById(this.props.answerId).then(answer => {
                this.setState({answer: answer});
            })
        })
    }

    render() {
        return <li className="list-group-item">
            <div>{this.state.answer.title}</div>
            <div>{'by ' + this.state.answer.user.username}</div>
            <div>{this.state.answer.answer}</div>
            <button type="button"
                    className="btn btn-danger"
                    onClick={this.deleteAnswer}>
            Delete Answer
            </button>
        </li>
    }
}