import React from 'react';
import AnswerService from "../services/AnswerService";
import QuestionService from "../services/QuestionService";
import UserService from '../services/UserService';

export default class WriteAnswerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionId: '',
            question: {},
            answerTitle: '',
            answerBody: ''
        }
        this.formUpdate = this.formUpdate.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.questionService = QuestionService.instance;
        this.answerService = AnswerService.instance;
        this.userService = UserService.instance;
    }

    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    /**
     * Posts a new answer to the current state's question, with the title and body being the current state's body,
     * and the author being the currently logged in user.
     */
    submitAnswer() {
        let newAnswer = {
            title: this.state.answerTitle,
            answer: this.state.answerBody
        }
        // Check that the user is logged in before trying to create a new answer
        this.userService.getProfile().then(user => {
            if (user) {
                this.answerService.createNewAnswer(this.state.questionId, newAnswer).then(answer => {
                    if (answer && this.props.reloadAnswers) {
                        this.props.reloadAnswers();
                    }
                });
            } else {
                this.props.history.push('/login');
            }
        })
    }

    componentDidMount() {
        this.setState({
            questionId: this.props.questionId
        }, () => {
            if (this.props.questionId) {
                this.questionService.findQuestionById(this.props.questionId).then(question => {
                    this.setState({question: question});
                });
            }
        })    ;
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            questionId: newProps.questionId
        }, () => {
            this.questionService.findQuestionById(newProps.questionId).then(question => {
                this.setState({question: question});
            });
        });
    }

    render() {
        return (<div>
            <label>Answer Title</label>
            <input type="text"
                   placeholder="Answer Title"
                   onChange={event => this.formUpdate({answerTitle: event.target.value})}/>

            <label>Answer Body</label>
            <input type="text"
                   placeholder="Answer"
                   onChange={event => this.formUpdate({answerBody: event.target.value})}/>
            <button type="button"
                    className="btn btn-primary"
                    onClick={this.submitAnswer}>
                Submit Answer
            </button>
        </div>)
    }
}