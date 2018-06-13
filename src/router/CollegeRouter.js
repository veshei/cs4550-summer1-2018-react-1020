import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CollegeSearchPage from '../components/CollegeSearchPage';
import HomePage from '../components/HomePage';
import CollegePage from '../components/CollegePage';

export default class CollegeRouter extends React.Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/search" component={CollegeSearchPage}>
                </Route>
                <Route exact path="/" component={HomePage}>
                </Route>
                <Route exact path="/college/:collegeId" component={CollegePage}>
                </Route>
            </div>
        </Router>;
    }
}