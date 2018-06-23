import React from 'react';
import './CollegeQuestionListItem.css';
import {Link} from 'react-router-dom';
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";

/**
 * An individual component for rendering question information in a question list.
 */
export default class CollegeQuestionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            question: {
                id: '',
                title: '',
                question: '',
                user: {
                    id: '',
                    username: ''
                }
            },
            canUserDelete: false // by default is false
        };
        this.questionService = QuestionService.instance;
        this.userService = UserService.instance;
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.canUserDelete = this.canUserDelete.bind(this);
    }

    /**
     * Deletes this component's question
     */
    deleteQuestion() {
        this.questionService.deleteQuestion(this.state.question.id).then(() => {
            if (this.props.reloadQuestions) {
                this.props.reloadQuestions();
            }
        })
    }

    /**
     * Determines whether or not the currently logged in user, if it exists, can delete this question.
     */
    canUserDelete() {
        this.userService.getProfile().then(user => {
            if (!user) {
                this.setState({canUserDelete: false});
            } else if (user.id === this.state.question.user.id || user.role === 'ADMIN') {
                this.setState({canUserDelete: true});
            } else {
                this.setState({canUserDelete: false});
            }
        });
    }

    /**
     * Redirects the user to the answers page for the question of the given id.
     * @param questionId
     */
    showAnswersForQuestion(questionId) {
        this.props.history.push('/college/' + this.state.collegeId + '/question/' + questionId + '/answer');
    }

    componentDidMount() {
        this.setState({
            collegeId: this.props.collegeId,
            question: this.props.question
        });
        this.canUserDelete();
    }

    render() {
        console.log(this.state.question);
        return (<li className="list-group-item">
            <Link to={'/college/' + this.state.collegeId + '/question/' + this.state.question.id + '/answer'}>
            <button type="button"
                    className="btn btn-primary float-right">See Answers</button>
            </Link>
            {this.state.canUserDelete && <button type="button"
                    className="btn btn-danger float-right"
                    onClick={this.deleteQuestion}>Delete</button>}
            <div className="question-title">{this.state.question.title}</div>
            <div>{this.state.question.user ? 'by ' + this.state.question.user.username : ''}</div>
            <div>{this.state.question.question}</div>
        </li>)
    }
}