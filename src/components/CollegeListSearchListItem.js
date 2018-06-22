import React from 'react';
import {Link} from 'react-router-dom';
import CollegeListService from "../services/CollegeListService";

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
            },
            collegeList: {
                id: '',
                name: '',
                listOfColleges: [],
            },
        }
        this.collegeListService = CollegeListService.instance;
        this.addCollege = this.addCollege.bind(this);
    };

    componentDidMount() {
        this.setCollege(this.props.college);
        this.setCollegeList(this.props.collegeList);
    }

    componentWillReceiveProps(newProps) {
        this.setCollege(this.props.college);
        this.setCollegeList(newProps.collegeList);
    }

    setCollege(college) {
        this.setState({college: college});
    }

    setCollegeList(collegeList) {
        this.setState({collegeList: collegeList});
    }

    addCollege(collegeId) {
        console.log(this.state.collegeList);
        if (this.state.collegeList.listOfColleges != null) {
            this.state.collegeList.listOfColleges.push(collegeId);
            this.collegeListService.updateCollegeList(this.state.collegeList)
                .then(collegeList => {
                    if (collegeList) {
                        alert("success");
                    }
                    else {
                        alert("fail");
                    }
                })
        }
        else {
            this.state.collegeList.listOfColleges = [];
            this.state.collegeList.listOfColleges.push(collegeId);
            this.collegeListService.updateCollegeList(this.state.collegeList)
                .then(collegeList => {
                    if (collegeList) {
                        console.log(collegeList);
                        alert("success");
                    }
                    else {
                        alert("fail");
                    }
                })
        }
    }
    deleteCollege(collegeId) {
        const index = this.state.collegeList.listOfColleges.indexOf(collegeId);
        this.state.collegeList.listOfColleges.splice(index, 1);
        console.log(this.state.collegeList.listOfColleges);
        this.collegeListService.updateCollegeList(this.state.collegeList)
            .then(collegeList => {
                if (collegeList) {
                    console.log(collegeList);
                    alert("success");
                }
                else {
                    alert("fail");
                }
            })
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
        <button className="float-right btn btn-primary"
                onClick={() => this.addCollege(this.state.college.id)}>
            Add College
        </button>
        </li>);
    }
}