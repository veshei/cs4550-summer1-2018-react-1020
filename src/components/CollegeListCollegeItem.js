import React from 'react';
import CollegeService from "../services/CollegeService";
import {Link} from 'react-router-dom';

export default class CollegeListCollegeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            schoolInfo: {
                school: {
                    id: '',
                    name: ''
                }
            }
        }
        this.collegeService = CollegeService.instance;
    }

    componentDidMount() {
        this.setState({
            collegeId: this.props.collegeId
        }, () => {
            this.collegeService.searchCollegeInfoById(this.state.collegeId).then(college => {
                this.setState({schoolInfo: college.results[0]});
            })
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegeId: newProps.collegeId
        }, () => {
            this.collegeService.searchCollegeInfoById(newProps.collegeId).then(college => {
                this.setState({college: college.results[0]});
            })
        });
    }

    render() {
        return (<li className="list-group-item">
            <Link to={{
                pathname: "/college/" + this.state.schoolInfo.id,
                state: {
                    collegeId: this.state.schoolInfo.id
                }
            }}>{this.state.schoolInfo.school.name}
            </Link>
        </li>)
    }
}