import React from 'react';
import CollegeListService from "../services/CollegeListService";
import CollegeListSearchPage from "./CollegeListSearchPage";
import CollegeListItem from "./CollegeListItem";
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';
import CollegeService from "../services/CollegeService";

export default class CollegeListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeList: {
                id: '',
                name: '',
                listOfColleges: [],
            },
            colleges: [],
        };
        this.collegeService = CollegeService.instance;
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

    renderListOfColleges() {
        console.log(this.state.colleges);
        let listOfColleges = this.state.collegeList.listOfColleges.map((collegeId, index) => {
                return (<li key={index}
                            className="list-group-item">
                    <Link to={{
                        pathname: "/college/" + collegeId,
                        state: {
                            collegeId: collegeId
                        }
                    }}>{collegeId}
                    </Link>
                </li>)
        });
        console.log(listOfColleges);
        return (
            <ul className='list-group'>{listOfColleges}</ul>
        )
    }

    render() {
        return (
            <div>
                <h1>College List Page for {this.state.collegeList.name}</h1>
                <CollegeListSearchPage collegeList={this.state.collegeList}
                                       renderListOfColleges={this.renderListOfColleges}/>
                {this.renderListOfColleges()}
            </div>);
    }
}