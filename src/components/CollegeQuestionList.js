import React from 'react';
import QuestionService from '../services/QuestionService';
import QuestionListItem from './CollegeQuestionListItem';
import WriteQuestion from "./WriteQuestion";
import './CollegeQuestionList.css';

/**
 * A component for a list of questions.
 */
export default class CollegeQuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            questions: []
        };
        this.questionService = QuestionService.instance;
        this.reloadQuestions = this.reloadQuestions.bind(this);
    }

    componentDidMount() {
        if (this.props.collegeId) {
            this.questionService.findQuestionsForCollege(this.props.collegeId).then(questions => {
                this.setState({
                    collegeId: this.props.collegeId,
                    questions: questions
                })
            });
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegeId: newProps.collegeId,
        }, () => {
            this.questionService.findQuestionsForCollege(newProps.collegeId).then(questions => {
                this.setState({
                    questions: questions
                });
            });
        });
    }

    /**
     * Retrieves the questions for the college of the current college id and sets it to this state's questions field.
     */
    reloadQuestions() {
        this.questionService.findQuestionsForCollege(this.state.collegeId).then(questions => {
            this.setState({questions: questions});
        });
    }

    render() {
        return (<div className="list-group question-list">
            <li className="list-group-item active"><h5>Questions for {this.state.collegeId}</h5></li>
            <WriteQuestion reloadQuestions={this.reloadQuestions} collegeId={this.state.collegeId}/>

            {this.state.questions.map((question, idx) => {
                return <QuestionListItem question={question} collegeId={this.state.collegeId} key={idx}/>
            })}

        </div>)
    }
}