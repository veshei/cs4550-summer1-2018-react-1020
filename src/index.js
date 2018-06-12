import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link,Switch, Route}
    from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import NavBar from "./Components/NavBar";
import './Style.css';
import AccountSideBar from "./Components/AccountSideBar";

const Home = () => {
    return (
        <div className="container">
            <div className="container-col">
            <AccountSideBar/>
            </div>
            <div className="container-main">
                <h1> Welcome to College Counseling </h1>
                <Link to='/'> Click Here To Search Colleges </Link></div>
            <div className="container-col"> </div>
        </div>
    )
};

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path='/'
                       component={Home}/>
                <Route exact path='/CollegeSearch'
                       component={NavBar}/>
            </div>
        </Router>
    )
};
const Header = () => {
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <App/>
            </div>
        </div>
    )
};
ReactDOM.render(
    <Header/>,
    document.getElementById('root')
);
