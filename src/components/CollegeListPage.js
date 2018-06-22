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
            collegeList: {
                id: '',
                name: '',
                listOfColleges: [],
            }
        };
    }

    componentDidMount() {
        this.setCollegeList(this.props.history.location.state.collegeList);
    }

    componentWillReceiveProps(newProps) {
        this.setCollegeList(newProps.collegeList);
    }

    setCollegeList(collegeList) {
        this.setState({collegeList: collegeList});
    }

    renderListOfColleges() {
        console.log(this.state.collegeList);
        if (this.state.collegeList.listOfColleges != null) {
            return (
                <ul className='list-group'>
                    {this.state.collegeList.listOfColleges.map(collegeId => {
                        return <CollegeListCollegeItem key={collegeId}
                                                       collegeId={collegeId}
                                                       collegeList={this.state.collegeList}/>
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
                                                       collegeId={collegeId}/>
                    })}
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>List of Colleges for {this.state.collegeList.name}</h1>
                <CollegeListSearchPage collegeList={this.state.collegeList}/>
                {this.renderListOfColleges()}
            </div>);
    }
}