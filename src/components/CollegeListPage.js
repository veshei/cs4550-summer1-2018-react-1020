import React from 'react';
import CollegeListService from "../services/CollegeListService";
import CollegeListSearchPage from "./CollegeListSearchPage";
import CollegeListItem from "./CollegeListItem";
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';
import CollegeService from "../services/CollegeService";
import CollegeListCollegeItem from './CollegeListCollegeItem';

export default class CollegeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeListId: '',
            collegeList: {
                id: '',
                name: '',
                listOfColleges: [],
            }
        };
        this.deleteCollege = this.deleteCollege.bind(this);
        this.addCollege = this.addCollege.bind(this);
        this.collegeListService = CollegeListService.instance;

    }

    componentDidMount() {
        this.setCollegeListId(this.props.history.location.state.collegeListId);
        this.findCollegeListById(this.props.history.location.state.collegeListId);
    }

    componentWillReceiveProps(newProps) {
        this.setCollegeListId(newProps.collegeListId);
        this.findCollegeListById(newProps.history.location.state.collegeListId);
    }

    setCollegeListId(collegeListId) {
        this.setState({collegeListId: collegeListId});
    }

    setCollegeList(collegeList) {
        this.setState({collegeList: collegeList})
    }

    findCollegeListById(collegeListId) {
        this.collegeListService.findCollegeListById(collegeListId)
            .then(collegeList => {
                this.setCollegeList(collegeList);
            });
    }

    deleteCollege(collegeId) {
        const index = this.state.collegeList.listOfColleges.indexOf(collegeId);
        this.state.collegeList.listOfColleges.splice(index, 1);
        console.log(this.state.collegeList.listOfColleges);
        this.collegeListService.deleteCollege(this.state.collegeList)
            .then(() => {
                this.findCollegeListById(this.state.collegeListId)
            })
    }

    addCollege(collegeId) {
        console.log(this.state.collegeList);
        if (this.state.collegeList.listOfColleges != null) {
            this.state.collegeList.listOfColleges.push(collegeId);
            this.collegeListService.addCollege(this.state.collegeList)
                .then(() => {
                    this.findCollegeListById(this.state.collegeListId);
                })
                .then(() => {
                    window.location.reload();
                })
        }
        else {
            this.state.collegeList.listOfColleges = [];
            this.state.collegeList.listOfColleges.push(collegeId);
            this.collegeListService.addCollege(this.state.collegeList)
                .then(() => {
                    this.findCollegeListById(this.state.collegeListId);
                })
                .then(() => {
                    window.location.reload();
                })
        }
    }

    renderListOfColleges() {
        console.log(this.state.collegeList);
        if (this.state.collegeList.listOfColleges != null) {
            return (
                <ul className='list-group'>
                    {this.state.collegeList.listOfColleges.map(collegeId => {
                        return <CollegeListCollegeItem key={collegeId}
                                                       collegeId={collegeId}
                                                       collegeList={this.state.collegeList}
                                                       deleteCollege={this.deleteCollege}/>
                    })}
                </ul>
            )
        }
        else {
            this.state.collegeList.listOfColleges = [];
            return (
                <ul className='list-group'>
                    {this.state.collegeList.listOfColleges.map(collegeId => {
                        return <CollegeListCollegeItem key={collegeId}
                                                       collegeId={collegeId}
                                                       deleteCollege={this.deleteCollege}/>
                    })}
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>List of Colleges for {this.state.collegeList.name}</h1>
                <CollegeListSearchPage collegeList={this.state.collegeList}
                                       addCollege={this.addCollege}/>
                {this.renderListOfColleges()}
            </div>);
    }
}