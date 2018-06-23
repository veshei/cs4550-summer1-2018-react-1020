import React from 'react';
import QuestionService from '../services/QuestionService';
import UserService from '../services/UserService';

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
        this.userService = UserService.instance;
    }

    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    submitQuestion(questionTitle, questionBody) {
        const newQuestion = {
            collegeId: this.state.collegeId,
            title: questionTitle,
            question: questionBody,
        };
        // Check that the user is logged in before doing anything
        this.userService.getProfile().then(user => {
            if (user) {
                this.questionService.createQuestion(newQuestion).then(question => {
                    console.log(question);
                    // Reload the question list
                    console.log(this.props.reloadQuestions);
                    if (this.props.reloadQuestions) {
                        this.props.reloadQuestions();
                    }
                });
            } else {
                this.props.history.push('/login');
            }
        })


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
        return (<div className="form-group">
            <div className="form-group">
                <label>Question Title</label>
                <input type="text"
                       placeholder="Question Title"
                       className="form-control col-4"
                       onChange={event => {
                           this.formUpdate({questionTitle: event.target.value})
                       }}/>
            </div>

            <div className="form-group">
                <label>Question Body</label>
                <textarea type="text"
                          rows="5"
                          placeholder="Question Body"
                          className="form-control"
                          onChange={event => {
                              this.formUpdate({questionBody: event.target.value})
                          }}/>
            </div>

            <button type="button"
                    className="btn btn-primary"
                    onClick={() => this.submitQuestion(this.state.questionTitle, this.state.questionBody)}>
                Submit
            </button>
        </div>)
    }
}