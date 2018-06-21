import React from 'react';
import CollegeSearchListItem from './CollegeSearchListItem';
import {BrowserRouter as Router} from 'react-router-dom';
import CollegeListSearchListItem from "./CollegeListSearchListItem";

/**
 * A list component that displays information about colleges.
 */
export default class CollegeListSearchList extends React.Component {
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
            <ul>

                {this.state.collegesInfo.map(college => {
                    return (
                            <CollegeListSearchListItem college={college}
                                                       key={college.id}
                                                       collegeList={this.props.collegeList}/>)
                })}

            </ul>)
    }
}