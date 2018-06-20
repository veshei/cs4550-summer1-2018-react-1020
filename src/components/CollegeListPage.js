import React from 'react';
import CollegeListService from "../services/CollegeListService";
import CollegeListSearchPage from "./CollegeListSearchPage";
import CollegeListItem from "./CollegeListItem";

export default class CollegeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            collegeLists: [],
        },
        this.collegeListService = CollegeListService.instance;
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    render() {
        return (
            <div>
                <h1>College List Page</h1>
            </div>);
    }
}