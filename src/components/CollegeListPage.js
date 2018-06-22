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
            },
            colleges: []
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
        this.setState({collegeList: collegeList});
    }

    renderListOfColleges() {
        // collegeInfos = this.state.collegeList.listOfColleges.map((collegeId) => {
        //     let collegeInfo;
        //     this.collegeService.searchCollegeInfoById(collegeId).then(college => {
        //         collegeInfo = college;
        //     });
        // });

        // let listOfColleges = this.state.collegeList.listOfColleges.map((collegeId) => {
        //     return this.collegeService.searchCollegeInfoById(collegeId).then(college => {
        //         console.log(college.results[0].id);
        //         console.log(college.results[0].school.name);
        //         return (<li className="list-group-item">
        //             <Link to={{
        //                 pathname: "/college/" + college.results[0].id,
        //                 state: {
        //                     collegeId: college.results[0].id
        //                 }
        //             }}>{college.results[0].school.name}
        //             </Link>
        //         </li>)
        //     });
        // });
        // console.log(listOfColleges)
        return (
            <ul className='list-group'>
                {this.state.collegeList.listOfColleges.map(collegeId => {
                    return <CollegeListCollegeItem collegeId={collegeId}/>
                })}
            </ul>
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