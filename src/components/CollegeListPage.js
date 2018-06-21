import React from 'react';
import CollegeListService from "../services/CollegeListService";
import CollegeListSearchPage from "./CollegeListSearchPage";
import CollegeListItem from "./CollegeListItem";
import UserService from "../services/UserService";

export default class CollegeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeList: {
                id: '',
                name: '',
                listOfColleges: [],
            },
        };
        this.collegeListService = CollegeListService.instance;
        this.userService = UserService.instance;
    }

    componentDidMount() {
        this.setCollegeList(this.props.history.location.state.collegeList);
    }

    componentWillReceiveProps(newProps) {
        this.setCollegeList(newProps.collegeList);
    }

    setCollegeList(collegeList) {
        this.setState({collegeList: collegeList})
    }

    render() {
        return (
            <div>
                <h1>College List Page for {this.state.collegeList.name}</h1>
                <CollegeListSearchPage collegeList={this.state.collegeList}/>
            </div>);
    }
}