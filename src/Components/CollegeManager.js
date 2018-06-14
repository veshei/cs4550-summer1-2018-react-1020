import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CollegeSearchPage from './CollegeSearchPage';
import CollegeRouter from "../router/CollegeRouter";
import NavBar from './NavBar';

export default class CollegeManager extends React.Component {
    render() {
        return (<div>
            <NavBar/>
            <CollegeRouter/>
        </div>);
    }
}
