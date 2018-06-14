import React from 'react';

/**
 * An individual component for rendering question information in a question list.
 */
export default class CollegeQuestionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            question: {}
        };
    }

    componentDidMount() {
        this.setState({
            collegeId: this.props.collegeId,
            question: this.props.question
        })
    }

    render() {
        return (<li>
            {this.state.question.title}
        </li>)
    }
}