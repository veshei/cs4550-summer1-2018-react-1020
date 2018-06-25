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
            canAdd: false, // false by default
            shouldShowButton: false // false by default
        };
        this.userService = UserService.instance;
        this.getRole = this.getRole.bind(this);
        this.userCanAdd = this.userCanAdd.bind(this);
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUserForStudent = this.addUserForStudent.bind(this);
        this.addUserForParent = this.addUserForParent.bind(this);
        this.addUserForCounselor = this.addUserForCounselor.bind(this);
        this.deleteUserForStudent = this.deleteUserForStudent.bind(this);
        this.deleteUserForParent = this.deleteUserForParent.bind(this);
        this.deleteUserForCounselor = this.deleteUserForCounselor.bind(this);
        this.studentCanAdd = this.studentCanAdd.bind(this);
        this.parentCanAdd = this.parentCanAdd.bind(this);
        this.counselorCanAdd = this.counselorCanAdd.bind(this);
        this.containsParent = this.containsParent.bind(this);
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
            });
        }).then(() => {this.userCanAdd()});
    }

    studentCanAdd(loggedInStudentId) {
        if (this.state.user.role === 'STUDENT') {
            this.setState({canAdd: true});
        }
        if (this.state.user.role === 'PARENT') {
            this.userService.findParentForStudent(loggedInStudentId).then(parent => {
                console.log(parent);
                this.setState({canAdd: parent === null || parent.id !== this.state.user.id}); // User can add if parent is not set yet
            });
        } else if (this.state.user.role === 'COLLEGE_COUNSELOR') {
            this.userService.findCounselorForStudent(loggedInStudentId).then(counselor => {
                if (counselor) {
                    this.setState({canAdd: counselor.id !== this.state.user.id});
                } else {
                    this.setState({canAdd: true});
                }
            })
        } else {
            this.setState({canAdd: false});
        }
    }

    parentCanAdd(loggedInParentId) {
        if (this.state.user.role === 'STUDENT') {
            this.userService.findParentForStudent(this.state.user.id).then(parent => {
                if (parent) {
                    this.setState({canAdd: parent.id !== loggedInParentId})
                } else {
                    this.setState({canAdd: true});
                }
            })
        } else if (this.state.user.role === 'PARENT') {
            this.setState({canAdd: true});
        } else if (this.state.user.role === 'COLLEGE_COUNSELOR') {
            this.setState({canAdd: !this.containsParent(loggedInParentId, this.state.user.parents)})
        } else {
            this.setState({canAdd: false});
        }
    }

    containsParent(parentId, parentList) {
        for (let idx = 0; idx < parentList.length; idx += 1) {
            if (parentList[idx].id === parentId) {
                return true;
            }
        }
        return false;
    }

    counselorCanAdd(loggedInCounselorId) {
        if (this.state.user.role === 'STUDENT') {
            this.userService.findCounselorForStudent(this.state.user.id).then(counselor => {
                this.setState({canAdd: counselor === null || counselor.id !== loggedInCounselorId});
            })
        } else if (this.state.user.role === 'PARENT') {
            this.userService.findUserById(loggedInCounselorId).then(counselor => {
                this.setState({canAdd: !this.containsParent(this.state.user.id, counselor.parents)})
            })
        } else if (this.state.user.role === 'COUNSELOR') {
            this.setState({canAdd: true});
        } else {
            this.setState({canAdd: false});
        }
    }

    // Determines whether the user can add this user or not. The requirements for the ability to add this user are
    // 1. User is not already added
    // 2. If user is a student, this person's role added already
    userCanAdd() {
        this.userService.getProfile().then(loggedInUser => {
            switch (loggedInUser.role) {
                case 'STUDENT': {
                    return this.studentCanAdd(loggedInUser.id);
                }
                case 'PARENT': {
                    return this.parentCanAdd(loggedInUser.id);
                }
                case 'COLLEGE_COUNSELOR': {
                    return this.counselorCanAdd(loggedInUser.id);
                }
                default: {
                    return false;
                }
            }
        })
    }

    addUserForStudent(loggedInUserId) {
        if (this.state.user.role === 'PARENT') {
            // Check that the student's parent does not exist
            this.userService.findParentForStudent(loggedInUserId).then(parent => {
                if (!parent) {
                    this.userService.createStudentParentRelation(loggedInUserId, this.state.user.id)
                        .then(responseString => {
                            console.log(responseString);
                            alert('Parent added');
                        });
                } else {
                    alert('You already have a parent added!');
                }
                this.userCanAdd()
            })

        } else if (this.state.user.role === 'COLLEGE_COUNSELOR') {
            // Check that the student's counselor does not exist
            this.userService.findCounselorForStudent(loggedInUserId).then(counselor => {
                if (!counselor) {
                    this.userService.createStudentCounselorRelation(loggedInUserId, this.state.user.id)
                        .then(responseString => {
                            console.log(responseString);
                            alert('Counselor added to student');
                        });
                } else {
                    alert('You already have a counselor added!');
                }
                this.userCanAdd()
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
                        alert('Student added to counselor');
                    });
                } else {
                    alert('Student already has a counselor');
                }
            })
            this.userCanAdd()
        } else if (this.state.user.role === 'PARENT') {
            this.userService.createParentCounselorRelation(this.state.user.id, loggedInUserId).then(responseString => {
                if (responseString === 'ok') {
                    alert('Added parent');
                } else {
                    alert('Parent is already added');
                }
            });
            this.userCanAdd();
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
                    alert('Parent added to student');
                } else {
                    alert('Student already has a parent');
                }
                this.userCanAdd();
            })
        } else if (this.state.user.role === 'COLLEGE_COUNSELOR') {
            this.userService.createParentCounselorRelation(loggedInUserId, this.state.user.id).then(responseString => {
                if (responseString === 'ok') {
                    alert('Added counselor');
                } else {
                    alert('College counselor is already added');
                }
                this.userCanAdd();
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
        }).then(() => {this.userCanAdd()})
        // Check that they're compatible with each other
        // Send to the respective user service function
    }

    deleteUserForStudent(loggedInStudentId) {
        switch(this.state.user.role) {
            case 'STUDENT': {
                alert('Cannot delete users from other users');
                break;
            }
            case 'PARENT': {
                this.userService.deleteStudentParentRelation(loggedInStudentId, this.state.user.id).then(responseString => {
                    if (responseString === 'ok') {
                        alert('Parent removed from student');
                    } else {
                        alert('Could not remove parent form student')
                    }
                });
                this.userCanAdd()
                break;
            }
            case 'COLLEGE_COUNSELOR': {
                this.userService.deleteStudentCounselorRelation(loggedInStudentId, this.state.user.id).then(responseString => {
                    if (responseString === 'ok') {
                        alert('Counselor removed from student');
                    } else {
                        alert('Could not remove counselor from student');
                    }
                });
                this.userCanAdd()
                break;
            }
            default: {
                alert('Cannot delete admins from other users');
            }
        }
    }

    deleteUserForParent(loggedInParentId) {
        switch(this.state.user.role) {
            case 'STUDENT': {
                this.userService.deleteStudentParentRelation(this.state.user.id, loggedInParentId).then(responseString => {
                    if (responseString === 'ok') {
                        alert('Parent removed from student');
                    } else {
                        alert('Could not remove parent from student');
                    }
                    this.userCanAdd()
                });
                break;
            }
            case 'PARENT': {
                alert('Parents cannot remove parents from themselves');
                break;
            }
            case 'COLLEGE_COUNSELOR': {
                this.userService.deleteParentCounselorRelation(loggedInParentId, this.state.user.id).then(responseString => {
                    if (responseString === 'ok') {
                        alert('Counselor removed from parent');
                    } else {
                        alert('Could not remove counselor from parent');
                    }
                    this.userCanAdd()
                })
            }
        }
    }

    deleteUserForCounselor(loggedInCounselorId) {
        switch (this.state.user.role) {
            case 'STUDENT': {
                this.userService.deleteStudentCounselorRelation(this.state.user.id, loggedInCounselorId).then(responseString => {
                    if (responseString === 'ok') {
                        alert('Counselor removed from student');
                    } else {
                        alert('Could not remove counselor from student');
                    }
                    this.userCanAdd()
                });
                break;
            }
            case 'PARENT': {
                this.userService.deleteParentCounselorRelation(this.state.user.id, loggedInCounselorId).then(responseString => {
                    if (responseString === 'ok') {
                        alert('Counselor removed from parent');
                    } else {
                        alert('Could not remove counselor from parent');
                    }
                    this.userCanAdd()
                });
                break;
            }
            case 'COLLEGE_COUNSELOR': {
                alert('Counselors cannot remove counselors from themselves');
                break;
            }
        }
    }

    // Deletes this user from the "friend's" list of the currently logged in user
    deleteUser() {
        this.userService.getProfile().then(loggedInUser => {
            if (loggedInUser) {
                switch (loggedInUser.role) {
                    case 'STUDENT': {
                        this.deleteUserForStudent(loggedInUser.id);
                        break;
                    }
                    case 'PARENT': {
                        this.deleteUserForParent(loggedInUser.id);
                        break;
                    }
                    case 'COLLEGE_COUNSELOR':
                        this.deleteUserForCounselor(loggedInUser.id);
                        break;
                }
            }
        }).then(this.userCanAdd);
    }

    renderButton() {
        if (this.state.canAdd) {
            return <button type="button"
                    onClick={this.addUser}
                    className="btn btn-primary">
                Add {this.state.user.role.toLowerCase()}
            </button>
        } else {
            return <button type="button"
                    onClick={this.deleteUser}
                    className="btn btn-danger">
                Delete {this.state.user.role.toLowerCase()}
            </button>
        }
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
            {this.renderButton()}
        </div>);
    }
}