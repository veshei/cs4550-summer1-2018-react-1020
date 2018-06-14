import React from 'react';
import {Link} from 'react-router-dom';

/**
 * An individual item in the CollegeList that displays college information
 */
export default class CollegeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            college: {
                id: '',
                school: {}
            }
        } // object with the same format as an individual college info entry in the College Scorecard API
    };

    componentDidMount() {
        this.setState({
            college: this.props.college
        });
    }

    render() {
        return (<li><Link to={{
            pathname: "/college/" + this.state.college.id,
            state: {
                collegeId: this.state.college.id
            }
        }}>{this.state.college.school.name}</Link></li>);
    }
}