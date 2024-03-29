import React from 'react';
import UserService from "../services/UserService";
// import '../../node_modules/font-awesome/css/font-awesome.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.css';


export default class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.userService = UserService.instance;
        this.state = {
            user: {
                username: '',
                role: ''
            }
        }
        this.getLoggedInUser = this.getLoggedInUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    /**
     * Gets the logged in user and sets the state's user to it.
     */
    getLoggedInUser() {
        this.userService.getProfile().then(user => {
            console.log(user);
            if (user) {
                this.setState({user: user});
            }
        })
    }

    /**
     * Logs the current user out.
     */
    logout() {
        this.userService.logout().then(() => {
            this.setState({user: {}});
        });
    }

    componentWillMount() {
        this.getLoggedInUser();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">US Colleges Search & Review Website</a>
                    <div className="navbar-collapse">
                        {!this.state.user.username ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login<span
                                        className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </ul> :
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/collegeList">College List</a>
                                </li>
                                <li>
                                    <a className="nav-link" href="/search/user">Search Users</a>
                                </li>
                                <li className="nav-item">
                                    {this.state.user.role === 'ADMIN' &&
                                    <a className="nav-link" href="/admin/dashboard">Admin Dashboard</a>}
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" onClick={this.logout}>Logout</a>
                                </li>
                            </ul>
                        }
                    </div>
                </nav>

            </div>)
    }
}