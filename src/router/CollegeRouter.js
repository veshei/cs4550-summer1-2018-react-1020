import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CollegeSearchPage from '../Components/CollegeSearchPage';
import HomePage from '../Components/HomePage';
import CollegePage from '../Components/CollegePage';
import Login from '../Components/Login';
import Register from '../Components/Register';
import NavBar from "../Components/NavBar";
import {Header} from "../index";
import UserProfile from '../Components/UserProfile';

export default class CollegeRouter extends React.Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/search" component={CollegeSearchPage}>
                </Route>
                <Route exact path='/'
                       component={HomePage}/>
                <Route exact path='/CollegeSearch'
                       component={NavBar}/>
                <Route exact path="/college/:collegeId" component={CollegePage}>
                </Route>
                <Route exact path="/login" component={Login}>
                </Route>
                <Route exact path="/register" component={Register}>
                </Route>
                <Route exact path="/profile" component={UserProfile}>
                </Route>
            </div>
        </Router>;
    }
}