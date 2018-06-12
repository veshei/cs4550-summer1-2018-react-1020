import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CollegeSearchPage from './CollegeSearchPage';

export default class CollegeManager extends React.Component {
    render() {
        return (<div>
            <Router>
                <div>
                    <Route path="/search" component={CollegeSearchPage}>
                    </Route>
                    <Link to="/search">Search for colleges</Link>
                </div>
            </Router>
        </div>);
    }
}
