import React from 'react';
import CollegeSearchListItem from './CollegeSearchListItem';
import {BrowserRouter as Router} from 'react-router-dom';
import './CollegeSearchList.css';

/**
 * A list component that displays information about colleges.
 */
export default class CollegeSearchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegesInfo: []
        }
    }

    componentDidMount() {
        this.setState({
            collegesInfo: this.props.collegesInfo
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegesInfo: newProps.collegesInfo
        });
    }

    render() {
        return (
            <div>
            <ul className="college-search-list list-group">

                {this.state.collegesInfo.map(college => {
                    return <CollegeSearchListItem college={college} key={college.id}/>
                })}

            </ul>
            </div>)
    }
}