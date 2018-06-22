import React from 'react';
import './CollegeQuestionListItem.css';
import {Link} from 'react-router-dom';

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
                    username: ''
                }
            }
        };
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
        })
    }

    render() {
        console.log(this.state.question);
        return (<li className="list-group-item">
            <Link to={'/college/' + this.state.collegeId + '/question/' + this.state.question.id + '/answer'}>
            <button type="button"
                    className="btn btn-primary float-right">See Answers</button>
            </Link>
            <div className="question-title">{this.state.question.title}</div>
            <div>{this.state.question.user ? 'by ' + this.state.question.user.username : ''}</div>
            <div>{this.state.question.question}</div>
        </li>)
    }
}