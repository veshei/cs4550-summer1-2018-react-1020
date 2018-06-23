import React from 'react';
import UserService from '../services/UserService';

export default class CreateNewUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            collegeLists: [],
            role: 'STUDENT' // student by default
        }
        this.setRole = this.setRole.bind(this);
        this.createUser = this.createUser.bind(this);
        this.userService = UserService.instance;
    }

    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    setRole(newRole) {
        switch (newRole) {
            case 'Student': {
                this.setState({role: 'STUDENT'});
                break;
            }
            case 'Parent': {
                this.setState({role: 'PARENT'});
                break;
            }
            case 'College Counselor': {
                this.setState({role: 'COLLEGE_COUNSELOR'});
                break;
            }
            case 'Admin': {
                this.setState({role: 'ADMIN'});
                break;
            }
            default:
                break;
        }
    }

    /**
     * Creates a new user with the current component's state's fields as the fields for the user.
     */
    createUser() {
        let newUser = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            collegeLists: this.state.collegeLists,
            role: this.state.role
        };
        this.userService.createUser(newUser).then(user => {
            if (user) {
                // If user creation is successful, navigate back to the admin dashboard
                this.props.history.push('/admin/dashboard');
            } else {
                alert('User creation unsuccessful');
            }
        });
    }

    render() {
        return <div className="container-fluid col-8">
            <label>Username</label>
            <input type="text"
                   className="registerBox"
                   onChange={event => this.formUpdate({username: event.target.value})}
                   placeholder="Username"/>

            <label>Password</label>
            <input type="password"
                   className="registerBox"
                   onChange={event => this.formUpdate({password: event.target.value})}
                   placeholder="Password"/>

            <label>First Name</label>
            <input type="text"
                   className="registerBox"
                   onChange={event => this.formUpdate({firstName: event.target.value})}
                   placeholder="First Name"/>

            <label>Last Name</label>
            <input type="text"
                   className="registerBox"
                   onChange={event => this.formUpdate({lastName: event.target.value})}
                   placeholder="Last Name"/>

            <label>Date Of Birth</label>
            <input type="date"
                   className="registerBox"
                   onChange={event => this.formUpdate({dateOfBirth: event.target.value})}/>

            <label>Role</label>
            <br/>
            <select className="registerBox" onChange={(event) => {
                this.setRole(event.target.value)
            }}>
                <option>Student</option>
                <option>Parent</option>
                <option>College Counselor</option>
                <option>Admin</option>
            </select>
            <br/>

            <button type="button"
                    className="btn btn-success"
                    onClick={this.createUser}>
                Create User
            </button>
        </div>
    }
}