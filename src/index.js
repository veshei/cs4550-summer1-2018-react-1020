import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link,Switch, Route}
    from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import NavBar from "./components/NavBar";
import './Style.css';
import AccountSideBar from "./components/AccountSideBar";
import CollegePage from "./components/CollegePage";
import CollegeManager from "./components/CollegeManager";




const Header = () => {
    return (
        <div style={{height:'100%'}}>
            <div>
                <NavBar/>
            </div>
            <div style={{height:'100%'}}>
                <div className="container">
                    <div className="container-col">
                        <AccountSideBar/>
                    </div>
                    <div className="container-main">
                        <CollegeManager/>
                    </div>
                    <div className="container-col">
                        <AccountSideBar/>
                    </div>
                </div>
            </div>
        </div>
    )
};
ReactDOM.render(
    <Header/>,
    document.getElementById('root')
);

