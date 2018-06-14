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
                username: ''
            }
        }
        this.getLoggedInUser = this.getLoggedInUser.bind(this);
    }

    /**
     * Gets the logged in user and sets the state's user to it.
     */
    getLoggedInUser() {
        this.userService.getProfile().then(user => {
            if (user) {
                this.setState({user: user});
                console.log(user.username);
            }
        })
    }

    componentWillMount() {
        this.getLoggedInUser();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">College Counsel</a>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Other</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Items</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-md-4" type="search" placeholder="Search for college"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <span>
                            Welcome {this.state.user.username}!
                    </span>
                    </div>
                </nav>

            </div>)
    }
}