import React from 'react';
import {Link} from 'react-router-dom';

/**
 * An individual item in the CollegeSearchList that displays college information
 */
export default class CollegeListSearchListItem extends React.Component {
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
        return (<li className="list-group-item">
            <Link to={{
            pathname: "/college/" + this.state.college.id,
            state: {
                collegeId: this.state.college.id
            }
        }}>{this.state.college.school.name}
        </Link>
        <button className="float-right btn btn-primary">Add College</button>
        </li>);
    }
}