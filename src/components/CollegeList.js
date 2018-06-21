import React from 'react';
import CollegeListService from "../services/CollegeListService";
import CollegeListSearchPage from "./CollegeListSearchPage";
import CollegeListItem from "./CollegeListItem";
import UserService from "../services/UserService";

export default class CollegeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            collegeLists: [],
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                role: ''
            }
        };
        this.setName = this.setName.bind(this);
        this.collegeListService = CollegeListService.instance;
        this.userService = UserService.instance;

    }

    componentDidMount() {
        this.findCollegeListForUser();
        this.setProfile();
    }

    componentWillReceiveProps(newProps) {
        this.findCollegeListForUser();
        this.setProfile();
    }

    setName(event) {
        this.setState({name: event.target.value});
    }
    setProfile() {
        this.userService.getProfile().then(user => {
            this.setUser(user);
        })
    }

    setUser(user) {
        this.setState({user: user});
    }

    renderCollegeLists() {
        let collegeLists = this.state.collegeLists.map((collegeList) => {
            return (<CollegeListItem key={collegeList.id}
                                     collegeList={collegeList}/>)
        });
        return (
            <ul className="list-group">{collegeLists}</ul>
        )
    }

    setListOfCollegeLists(collegeLists) {
        this.setState({collegeLists: collegeLists})
    }

    findCollegeListForUser() {
        this.collegeListService.findCollegeListForUser()
            .then(collegeLists => {
                this.setListOfCollegeLists(collegeLists)
            });
    }

    createCollegeList() {
        var collegeList = {
            name: this.state.name
        };
        this.collegeListService.createCollegeList(collegeList)
            .then(() => {
                this.renderCollegeLists();
            });
    }

    render() {
        return (
            <div>
                <h1>College List for {this.state.user.username}</h1>
                <input className="form-control"
                       placeholder="Name of college list"
                       value={this.state.name}
                       onChange={this.setName}/>
                {console.log(this.state.name)}
                <button className="btn btn-primary btn-block"
                        onClick={() => this.createCollegeList()}>
                    Submit name
                </button>
                <li className='list-group-item'>
                    {console.log(this.state.collegeLists)}
                    {this.renderCollegeLists()}
                    </li>
            </div>);
    }
}