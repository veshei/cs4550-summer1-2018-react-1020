import React from 'react'
import UserService from "../services/UserService";

export default class ViewOnlyUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                role: '',
                collegeLists: []
            }, // the user entity stored in the server
            firstName: '', // the first name field
            lastName: '', // the last name field
            dateOfBirth: '', // the date of birth field
            collegeLists: [],
            canAdd: false // false by default
        };
        this.userService = UserService.instance;
        this.getRole = this.getRole.bind(this);
        this.userCanAdd = this.userCanAdd.bind(this);
        this.addUser = this.addUser.bind(this);
        this.addUserForStudent = this.addUserForStudent.bind(this);
        this.addUserForParent = this.addUserForParent.bind(this);
        this.addUserForCounselor = this.addUserForCounselor.bind(this);
    }

    componentDidMount() {
        let userId;
        if (this.props.match.params['userId']) {
            userId = this.props.match.params['userId'];
        } else {
            userId = this.props.userId;
        }
        this.userService.findUserById(userId).then(user => {
            this.setState({
                user: user,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth,
                collegeLists: user.collegeLists
            })
        })
    }

    // Determines whether the user can add this user or not. The requirements for the ability to add this user are
    // 1. User is not already added
    // 2. If user is a student, this person's role added already
    userCanAdd() {
        // this.userService.getProfile().then(loggedInUser => {
        //     switch (loggedInUser.role) {
        //         case 'STUDENT': {
        //             if (this.state.user.role === 'PARENT') {
        //                 this.userService.findParentForStudent(loggedInUser.id).then(parent => {
        //                     this.setState({canAdd: parent === null}); // User can add if parent is not set yet
        //                 });
        //             } else if (this.state.user.role === 'COUNSELOR') {
        //                 this.userService.findCounselorForStudent(loggedInUser.id).then(counselor => {
        //                     this.setState({canAdd: counselor === null});
        //                 })
        //             }
        //             break;
        //         }
        //         case 'PARENT':
        //             if (this.state.user.role === 'STUDENT') {
        //                 // Find the student's parent and check if that id is equal with this id
        //                 this.userService.findParentForStudent(loggedInUser.id).then(parent => {
        //                     if (!parent) {
        //                         this.setState({canAdd: true});
        //                     } else if (parent.id !== )
        //                 })
        //             }
        //     }
        // })

        return true;
    }

    addUserForStudent(loggedInUserId) {
        if (this.state.user.role === 'PARENT') {
            // Check that the student's parent does not exist
            this.userService.findParentForStudent(loggedInUserId).then(parent => {
                if (!parent) {
                    this.userService.createStudentParentRelation(loggedInUserId, this.state.user.id)
                        .then(responseString => {
                            console.log(responseString);
                        });
                } else {
                    alert('You already have a parent added!');
                }
            })

        } else if (this.state.user.role === 'COLLEGE_COUNSELOR') {
            // Check that the student's counselor does not exist
            this.userService.findCounselorForStudent(loggedInUserId).then(counselor => {
                if (!counselor) {
                    this.userService.createStudentCounselorRelation(loggedInUserId, this.state.user.id)
                        .then(responseString => {
                            console.log(responseString);
                        });
                } else {
                    alert('You already have a counselor added!');
                }
            })

        } else {
            alert('Students cannot add other students or admins');
        }
    }

    addUserForCounselor(loggedInUserId) {
        if (this.state.user.role === 'STUDENT') {
            // Check that the student's counselor does not exist
            this.userService.findCounselorForStudent(this.state.user.id).then(counselor => {
                if (!counselor) {
                    this.userService.createStudentCounselorRelation(this.state.user.id, loggedInUserId).then(responseString => {
                        console.log(responseString);
                    });
                } else {
                    alert('Student already has a counselor');
                }
            })
        } else if (this.state.user.role === 'PARENT') {
            this.userService.createParentCounselorRelation(this.state.user.id, loggedInUserId).then(responseString => {
                if (responseString === 'ok') {
                    alert('Added parent');
                } else {
                    alert('Parent is already added');
                }
            });
        } else {
            alert('Counselors cannot add other parents or admins');
        }
    }

    addUserForParent(loggedInUserId) {
        if (this.state.user.role === 'STUDENT') {
            // Check that the student's parent does not exist
            this.userService.findParentForStudent(this.state.user.id).then(parent => {
                if (!parent) {
                    this.userService.createStudentParentRelation(this.state.user.id, loggedInUserId);
                } else {
                    alert('Student already has a parent');
                }
            })
        } else if (this.state.user.role === 'COLLEGE_COUNSELOR') {
            this.userService.createParentCounselorRelation(loggedInUserId, this.state.user.id).then(responseString => {
                if (responseString === 'ok') {
                    alert('Added counselor');
                } else {
                    alert('College counselor is already added');
                }
            });
        } else {
            alert('Parents cannot add other counselors or admins');
        }
    }

    addUser() {
        // Get the currently logged in user's role and this user's role
        // TODO: add thens after each service call
        this.userService.getProfile().then(loggedInUser => {
            if (loggedInUser) {
                if (loggedInUser.role === 'STUDENT') {
                   this.addUserForStudent(loggedInUser.id);
                } else if (loggedInUser.role === 'PARENT') {
                    this.addUserForParent(loggedInUser.id);
                } else if (loggedInUser.role === 'COLLEGE_COUNSELOR') {
                    this.addUserForCounselor(loggedInUser.id);
                }

            } else {
                window.location = '/login';
            }
        })
        // Check that they're compatible with each other
        // Send to the respective user service function
    }

    getRole(){
        if(this.state.role === 'STUDENT'){
            return 'Student'
        }
        else if(this.state.role === 'PARENT'){
            return 'Parent'
        }
        else if (this.state.role === 'COLLEGE_COUNSELOR') {
            return 'College Counselor';
        } else {
            return 'Admin';
        }
    }

    render() {
        return (<div style={{marginLeft: '25%', marginRight: '25%'}}>
            <h1> Profile</h1>
            <hr/>
            <label>Username</label>
            <br/>
            <input readOnly
                   type="text"
                   className="registerBoxReadOnly"
                   placeholder="Username"
                   value={this.state.user.username}
            />
            <br/>
            <label>Role</label>
            <br/>
            <input readOnly
                   type="text"
                   className="registerBoxReadOnly"
                   placeholder="Role"
                   value={this.getRole()}
            />
            <br/>

            <label>First Name</label>
            <br/>
            <input readOnly
                   type="text"
                   className="registerBoxReadOnly"
                   placeholder="First Name"
                   value={this.state.firstName}/>
            <br/>
            <label>Last Name</label>
            <br/>
            <input readOnly
                   type="text"
                   className="registerBoxReadOnly"
                   placeholder="Last Name"
                   value={this.state.lastName}
            />
            <br/>
            <label>Date of Birth</label>
            <br/>
            <input readOnly
                   type="date"
                   className="registerBoxReadOnly"
                   placeholder="Username"
                   value={this.state.dateOfBirth.substring(0, 10)}
            />
            <br/>

            {this.userCanAdd() &&
            <button type="button"
                    onClick={this.addUser}
                    className="btn btn-primary">
                Add {this.state.user.role.toLowerCase()}
            </button>}
        </div>);
    }
}