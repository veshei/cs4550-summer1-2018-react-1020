import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HomePage from '../components/HomePage';
import CollegePage from '../components/CollegePage';
import Login from '../components/Login';
import Register from '../components/Register';
import NavBar from "../components/NavBar";
import {Header} from "../index";
import UserProfile from '../components/UserProfile';
import CollegeList from '../components/CollegeList';
import CollegeListPage from "../components/CollegeListPage";
import CollegeAnswersList from '../components/CollegeAnswersList';

export default class CollegeRouter extends React.Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/search" component={CollegePage}>
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
                <Route exact path="/collegeList" component={CollegeList}/>
                <Route exact path="/collegeList/:collegeListId" component={CollegeListPage}/>
                <Route exact path="/college/:collegeId/question/:questionId/answer" component={CollegeAnswersList}/>
            </div>
        </Router>;
    }
}