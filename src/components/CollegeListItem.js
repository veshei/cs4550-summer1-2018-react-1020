import React from 'react';
import {Link} from 'react-router-dom';

export default class CollegeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeList: {
                id: '',
                name: '',
                user: '',
                listOfColleges: []
            }
            }
    };

    componentDidMount() {
        this.setCollegeList(this.props.collegeList);
    }

    setCollegeList(collegeList) {
        this.setState({collegeList: collegeList})
    }

    render() {
        return (
            <li className="list-group-item">
            <Link to={{
                pathname: "/collegeList/" + this.state.collegeList.id,
                state: {
                    collegeListId: this.state.collegeList.id,
                    collegeList: this.state.collegeList
                }
            }}>{this.state.collegeList.name} {console.log(this.state.collegeList)}
            </Link>
        </li>
        );
    }
}