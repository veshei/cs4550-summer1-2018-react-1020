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
                colleges: []
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
                    collegeListId: this.state.collegeList.id
                }
            }}>{this.state.collegeList.name}
            </Link>
        </li>
        );
    }
}