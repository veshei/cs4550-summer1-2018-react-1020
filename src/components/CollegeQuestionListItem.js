import React from 'react';
import './CollegeQuestionListItem.css';

/**
 * An individual component for rendering question information in a question list.
 */
export default class CollegeQuestionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            question: {
                title: '',
                question: '',
                user: {
                    username: ''
                }
            }
        };
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
            <div className="question-title">{this.state.question.title}</div>
            <div>{this.state.question.user ? 'by ' + this.state.question.user.username : ''}</div>
            <div>{this.state.question.question}</div>
        </li>)
    }
}