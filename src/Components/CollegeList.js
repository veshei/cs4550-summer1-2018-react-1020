import React from 'react';
import CollegeListItem from './CollegeListItem';
import {BrowserRouter as Router} from 'react-router-dom';

/**
 * A list component that displays information about colleges.
 */
export default class CollegeList extends React.Component {
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
                    return <CollegeListItem college={college} key={college.id}/>
                })}

            </ul>)
    }
}