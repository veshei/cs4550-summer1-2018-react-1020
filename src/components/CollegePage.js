import React from 'react';
import CollegeService from '../services/CollegeService';

/**
 * A component for rendering college information for a particular college.
 */
export default class CollegePage extends React.Component {
    constructor(props) {
        // Required props: collegeId
        super(props);
        this.state = {
            collegeId: '',
            schoolInfo: {}, // information that includes the school and yearly statistics
            school: {} // information about the school
        };
        this.collegeService = CollegeService.instance;
    }

    componentDidMount() {
        let collegeId = this.props.collegeId;
        if (!collegeId) { // If not passed in as a prop. get from the url
            collegeId = this.props.match.params['collegeId'];
        }
        this.collegeService.searchCollegeInfoById(collegeId).then(schoolJSON => {
            let schoolInfo = schoolJSON.results[0];
            this.setState({
                collegeId: this.props.collegeId,
                schoolInfo: schoolInfo,
                school: schoolInfo.school
            });
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.school.name}</h1>
                <h6>{this.state.school.city}, {this.state.school.state}</h6>
            </div>
        )
    }
}