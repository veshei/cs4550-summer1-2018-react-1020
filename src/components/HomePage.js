import React from 'react';
import AccountSideBar from './AccountSideBar';
import NavBar from './NavBar';
import CollegeSearchPage from './CollegeSearchPage';
import RecommendationsSideBar from './RecommendationsSideBar'
import UserService from "../services/UserService";

export default class HomePage extends React.Component {
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
        return  <div style={{height:'100%'}}>
                    {!this.state.user.username ?
                        <div className="container">
                            <div className="container-main col-8">
                                <CollegeSearchPage/>
                            </div>
                            <div className="container-col col-2">
                                <RecommendationsSideBar/>
                            </div>
                        </div> :
                        <div className="container">
                            <div className="container-col col-2">
                            <AccountSideBar/>
                            </div>
                            <div className="container-main col-8">
                            <CollegeSearchPage/>
                            </div>
                            <div className="container-col col-2">
                            <RecommendationsSideBar/>
                            </div>
                        </div>
                    }
            </div>
    }
}