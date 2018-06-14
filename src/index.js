import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './Style.css';
import CollegeManager from "./components/CollegeManager";

const App = () => {
    return (
       <CollegeManager/>
    )
};
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

