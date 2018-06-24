import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import UserService from "../services/UserService";


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
            }
        };
        this.getProfile = this.getProfile.bind(this);
        this.userService = UserService.instance;
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
    }

    componentWillReceiveProps(newProps) {
        this.getProfile();
    }

    render() {
        return (
            <div className="wrapper" style={{width: '75%'}}>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h4>Welcome {this.state.user.firstName} {this.state.user.lastName}!</h4>
                    </div>
                    <ul style={{padding: "0px"}}
                        className="list-group">
                        <li className="list-group-item">Username: {this.state.user.username}</li>
                        <li className="list-group-item">Date of Birth: {this.state.user.dateOfBirth.split("T", 1)}</li>
                        <li className="list-group-item">Role: {this.state.user.role}</li>

                    </ul>
                </nav>

            </div>)
    }
};

