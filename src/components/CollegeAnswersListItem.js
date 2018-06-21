import React from 'react';

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
                user: ''
            }
        }
    }

    render() {
        return <li className="list-group-item">
            <div>{this.state.answer.title}</div>
            <div>{this.state.answer.answer}</div>
        </li>
    }
}