import React from 'react';
import AccountSideBar from './AccountSideBar';
import NavBar from './NavBar';
import CollegeSearchPage from './CollegeSearchPage';
import RecommendationsSideBar from './RecommendationsSideBar'

export default class HomePage extends React.Component {
    render() {
        return  <div style={{height:'100%'}}>

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
            </div>
    }
}