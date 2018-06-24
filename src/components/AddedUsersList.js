import React from 'react';
import UserService from '../services/UserService';
import UserListItem from "./UserListItem";

export default class AddedUsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                username: '',
                role: ''
            },
            students: [],
            parents: [],
            counselors: []
        }
        this.userService = UserService.instance;
    }

    componentDidMount() {
        this.userService.getProfile().then(loggedInUser => {
            if (!loggedInUser) {
                window.location = '/login';
            }

            switch (loggedInUser.role) {
                case 'STUDENT': {
                    this.userService.findParentForStudent(loggedInUser.id).then(parent => {
                        if (parent) {
                            this.setState({parents: [parent]})
                        }
                    });
                    this.userService.findCounselorForStudent(loggedInUser.id).then(counselor => {
                        if (counselor) {
                            this.setState({counselor: [counselor]});
                        }
                    })
                    break;
                }
                case 'PARENT': {
                    this.userService.findUserById(loggedInUser.id).then(parent => {
                        this.setState({
                            students: parent.students
                        });
                    })
                    this.userService.findCounselorsForParent(loggedInUser.id).then(counselors => {
                        this.setState({
                            counselors: counselors
                        })
                    })
                    break;
                }
                case 'COLLEGE_COUNSELOR': {
                    this.userService.findUserById(loggedInUser.id).then(counselor => {
                        this.setState({
                            students: counselor.students,
                            parents: counselor.parents
                        })
                    })
                    break;
                }
            }
        })
    }

    render() {
        return (<div className="container-fluid added-users">
            <h3>Added Users</h3>
            {(this.state.user.role !== 'STUDENT' && this.state.user.role !== 'ADMIN') &&
            <ul className="list-group">
                {this.state.students.map((student, idx) => {
                    return <UserListItem user={student}
                                  key={idx}/>
                })}
            </ul>}

            {(this.state.user.role !== 'PARENT' && this.state.user.role !== 'ADMIN') &&
            <ul className="list-group">
                {this.state.parents.map((parent, idx) => {
                    return <UserListItem user={parent}
                                         key={idx}/>
                })}
            </ul>}

            {(this.state.user.role !== 'COLLEGE_COUNSELOR' && this.state.user.role !== 'ADMIN') &&
            <ul className="list-group">
                {this.state.counselors.map((counselor, idx) => {
                    return <UserListItem user={counselor}
                                         key={idx}/>
                })}
            </ul>}
        </div>);
    }
}