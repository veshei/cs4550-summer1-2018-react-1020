import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import UserService from "../services/UserService";
import CollegeListService from "../services/CollegeListService";
import {Link} from "react-router-dom";


export default class AccountSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                role: ''
            },
            collegeList: []
        };
        this.getProfile = this.getProfile.bind(this);
        this.userService = UserService.instance;
        this.collegeListService = CollegeListService.instance;
    }

    getProfile() {
        this.userService.getProfile().then(user => {
            if (user) {
                this.setUser(user);
            }
        })
    }

    setUser(user) {
        this.setState({user: user});
    }

    componentDidMount() {
        this.getProfile();
        this.collegeListService.findCollegeListsForUser().then((result)=>{
            this.setState({collegeList:result});
      })
    }

    componentWillReceiveProps(newProps) {
        this.getProfile();
      this.collegeListService.findCollegeListsForUser().then((result)=>{
        this.setState({collegeList:result});
      })
    }

    renderRole(){
        if(this.state.user.role !== ''){
            switch(this.state.user.role){
              case 'STUDENT':
                  return 'Student';
              case 'PARENT':
                return 'Parent';
              case 'COLLEGE_COUNSELOR':
                return 'College Counselor';
            }
        }

    }

    renderDate(){
        if(this.state.user.dateOfBirth !== ''){
            return new Date(this.state.user.dateOfBirth).toLocaleString().split(',')[0]
        }

    }
    renderCollegeList(){
        if(this.state.user.role ==='STUDENT'){
             return (
                 <div>
                   <h4>College Lists</h4>
                   <hr/>
                   {this.state.collegeList.map((collegeList,index) =>{
                     return (<div key={index}>
                       <Link to={{
                         pathname: "/collegeList",
                       }}> <h6>{(index + 1) + ': '+ collegeList.name}</h6>
                       </Link>
                     </div>)
                   })}
                 </div>)
        }

    }

    render() {
        return (
            <div className="wrapper" style={{width: '100%'}}>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h4>Welcome, {this.state.user.firstName} {this.state.user.lastName}!</h4>
                        <hr/>
                    </div>
                    <ul style={{padding: "0px"}}
                        className="list-group">
                        <li className="list-group-item">Username: {this.state.user.username}</li>
                        <li className="list-group-item">Date of Birth: {this.renderDate()}</li>
                        <li className="list-group-item">Role: {this.renderRole()}</li>

                    </ul>
                </nav>
              {this.renderCollegeList()}


            </div>)
    }
};

