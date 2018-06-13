import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link,Switch, Route}
    from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import NavBar from "./Components/NavBar";
import './Style.css';
import AccountSideBar from "./Components/AccountSideBar";
import CollegePage from "./Components/CollegePage";
import CollegeManager from "./Components/CollegeManager";

const App = () => {
    return (
       <CollegeManager/>
    )
};
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

