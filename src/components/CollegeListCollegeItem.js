import React from 'react';
import CollegeService from "../services/CollegeService";
import {Link} from 'react-router-dom';
import CollegeListService from "../services/CollegeListService";

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
            },
            collegeList: {
                id: '',
                name: '',
                listOfColleges: [],
            }
        };
        this.collegeService = CollegeService.instance;
        this.collegeListService = CollegeListService.instance;
    }

    componentDidMount() {
        this.setState({
            collegeId: this.props.collegeId
        }, () => {
            this.collegeService.searchCollegeInfoById(this.state.collegeId).then(college => {
                this.setState({schoolInfo: college.results[0]});
            })
        });
        console.log(this.props.collegeList);
        this.setCollegeList(this.props.collegeList);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegeId: newProps.collegeId
        }, () => {
            this.collegeService.searchCollegeInfoById(newProps.collegeId).then(college => {
                this.setState({college: college.results[0]});
            })
        });
        this.setCollegeList(newProps.collegeList);
    }

    setCollegeList(collegeList) {
        this.setState({collegeList: collegeList})
    }

    deleteCollege(collegeId) {
        const index = this.state.collegeList.listOfColleges.indexOf(collegeId);
        this.state.collegeList.listOfColleges.splice(index, 1);
        console.log(this.state.collegeList.listOfColleges);
        this.collegeListService.deleteCollege(this.state.collegeList)
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
                pathname: "/college/" + this.state.schoolInfo.id,
                state: {
                    collegeId: this.state.schoolInfo.id
                }
            }}>{this.state.schoolInfo.school.name}
            </Link>
            <button className="float-right btn btn-danger"
                    onClick={() => this.deleteCollege(this.state.collegeId)}>
                Delete College List
            </button>
        </li>)
    }
}