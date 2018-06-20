import React from 'react';
import CollegeSearchPage from "./CollegeSearchPage";
import CollegeListService from "../services/CollegeListService";

export default class CollegeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            listOfColleges: [],
        }
        this.setName = this.setName.bind(this);
        this.collegeListService = CollegeListService.instance;

    }

    setName(event) {
        this.setState({name: event.target.value});
    }

    createCollegeList() {
        var collegeList = {
            name: this.state.name
        }
        this.collegeListService.createCollegeList(collegeList);
    }

    render() {
        return (
            <div>
                <h1>College list</h1>
                <input className="form-control"
                       placeholder="Name of college list"
                       value={this.state.name}
                       onChange={this.setName}/>
                {console.log(this.state.name)}
                <button className="btn btn-primary btn-block"
                        onClick={() => this.createCollegeList}>
                    Submit name
                </button>
                <CollegeSearchPage/>
                <ul className="list-group">
                    <li className='list-group-item'></li>
                </ul>
                <h1>College List: {this.state.name}</h1>
            </div>);
    }
}