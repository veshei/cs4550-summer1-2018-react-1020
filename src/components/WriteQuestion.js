import React from 'react';
import QuestionService from '../services/QuestionService';

/**
 * A component for writing a question about a college.
 */
export default class WriteQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            questionTitle: '',
            questionBody: ''
        }
        this.formUpdate = this.formUpdate.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
        this.questionService = QuestionService.instance;
    }

    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    submitQuestion(questionTitle, questionBody) {
        const newQuestion = {
            collegeId: this.state.collegeId,
            title: questionTitle,
            question: questionBody
        };
        this.questionService.createQuestion(newQuestion).then(question => {
            console.log(question);
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegeId: newProps.collegeId
        })
    }


    componentDidMount() {
        this.setState({
            collegeId: this.props.collegeId,
        });
    }

    render() {
        return (<div>
            <label>Question Title</label>
            <input type="text"
                   placeholder="Question Title"
                   onChange={event => {this.formUpdate({questionTitle: event.target.value})}}/>

            <label>Question Body</label>
            <input type="text"
                   placeholder="Question Body"
                   onChange={event => {this.formUpdate({questionBody: event.target.value})}}/>

            <button type="button"
                    onClick={() => this.submitQuestion(this.state.questionTitle, this.state.questionBody)}>
                Submit
            </button>
        </div>)
    }
}