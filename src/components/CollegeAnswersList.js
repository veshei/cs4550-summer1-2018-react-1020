import React from 'react';
import AnswerService from '../services/AnswerService';
import CollegeQuestionListItem from "./CollegeQuestionListItem";
import CollegeAnswersListItem from './CollegeAnswersListItem';
import QuestionService from "../services/QuestionService";
import WriteAnswerComponent from "./WriteAnswerComponent";

/**
 * A component to render answers to a college question.
 */
export default class CollegeAnswersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            questionId: '',
            question: {
                title: '',
                question: '',
                user: {}
            },
            answers: []
        };
        this.questionService = QuestionService.instance;
        this.answerService = AnswerService.instance;
        this.reloadAnswers = this.reloadAnswers.bind(this);
    }

    /**
     * Reloads this component's answer list.
     */
    reloadAnswers() {
        this.answerService.findAllAnswersForQuestion(this.state.questionId).then(answers => {
            this.setState({answers: answers});
        });
    }

    componentDidMount() {
        let collegeId = this.props.collegeId;
        if (!collegeId) {
            collegeId = this.props.match.params['collegeId'];
        }

        let questionId = this.props.questionId;
        if (!questionId) {
            questionId = this.props.match.params['questionId'];
        }
        this.setState({
            collegeId: collegeId,
            questionId: questionId
        }, () => {
            if (questionId) {
                this.questionService.findQuestionById(questionId).then(question => {
                    this.setState({
                        question: question,
                        answers: question.answers
                    });
                });
            }
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegeId: newProps.collegeId,
            questionId: newProps.questionId
        }, () => {
            this.questionService.findQuestionById(newProps.questionId).then(question => {
                this.setState({
                    question: question,
                    answers: question.answers
                });
            });
        });
    }

    render() {
        return (<div>
            <h2>Question</h2>
            <div>{this.state.question.title}</div>
            <div>{'by ' + this.state.question.user.username}</div>
            <div>{this.state.question.question}</div>

            <WriteAnswerComponent reloadAnswers={this.reloadAnswers}
                                  history={this.props.history}
                                  questionId={this.state.questionId}/>
            <ul className="list-group">
                {this.state.answers.map((answer, idx) => {
                    return <CollegeAnswersListItem reloadAnswers={this.reloadAnswers}
                                                   answerId={answer.id}
                                                   key={idx}/>
                })}
            </ul>
        </div>)
    }
}