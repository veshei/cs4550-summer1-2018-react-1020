import React from 'react';
import UserService from '../services/UserService';

/**
 * Registration page component.
 */
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            roles: 'Student',
            dateOfBirth:'1111-01-01'
        };
        this.userService = UserService.instance;
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.setRole = this.setRole.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setDateOfBirth = this.setDateOfBirth.bind(this);
    }

    /**
     * Sets the state's username to the given username.
     * @param newUsername the new username
     */
    setUsername(newUsername) {
        this.setState({username: newUsername});
    }

    /**
     * Sets the state's password to the given password.
     * @param newPassword the new password
     */
    setPassword(newPassword) {
        this.setState({password: newPassword});
    }

    /**
     * Sets the state's confirm password to the given one.
     * @param newConfirmPassword the new password for the confirm password field
     */
    setConfirmPassword(newConfirmPassword) {
        this.setState({confirmPassword: newConfirmPassword});
    }

    /**
     * Sets the state's role to the given string.
     * @param newRole the new role
     */
    setRole(newRole) {
        if (newRole === 'Parent') {
            this.setState({roles: 'PARENT'});
        }
        else if(newRole === 'Student') {
            this.setState({roles: 'STUDENT'});
        }
        else if(newRole=== 'College Counselor'){
            this.setState({roles: 'COLLEGE_COUNSELOR'})
        }
    }

    /**
     * Sets the state's first name to the given one.
     * @param newFirstName the new first name for the first name field
     */
    setFirstName(newFirstName) {
        this.setState({firstName: newFirstName});
    }

    /**
     * Sets the state's last name to the given one.
     * @param newLastName the new last name for the last name field
     */
    setLastName(newLastName) {
        this.setState({lastName: newLastName});
    }

    /**
     * Sets the state's date of birth to the given one.
     * @param newDateOfBirth the new date of birth
     */
    setDateOfBirth(newDateOfBirth) {
        this.setState({dateOfBirth: newDateOfBirth});
    }

    /**
     * Makes a registration request with the given credentials.
     * @param username the username
     * @param password the password
     * @param password2 the second password, to confirm the first password
     */
    register(username, password, password2) {
        if (password === password2) {
            const credentials = {
                username: username,
                password: password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                roles: this.state.roles,
                dateOfBirth: this.state.dateOfBirth

            };

            this.userService.register(credentials).then(user => {
                console.log(credentials);
                console.log(user);
                // Redirect back to home
                if (user) {
                    window.location = '/';
                }
            });
        }
    }

    render() {
        return(
            <div>
                <label>Username </label>
                <input type="text"
                       placeholder="Username"
                       onChange={(event) => this.setUsername(event.target.value)}/>

                <label>Password</label>
                <input type="text"
                       placeholder="Password"
                       onChange={(event) => this.setPassword(event.target.value)}/>

                <label>Confirm password</label>
                <input type="text"
                       placeholder="Password"
                       onChange={(event) => {this.setConfirmPassword(event.target.value)}}/>

                <label>First Name</label>
                <input type="text"
                       placeholder="First Name"
                       onChange={(event) => {this.setFirstName(event.target.value)}}/>

                <label>Last Name</label>
                <input type="text"
                       placeholder="Last Name"
                       onChange={(event) => {this.setLastName(event.target.value)}}/>

                <label>Date of Birth</label>
                <input type="date"
                       onChange={(event) => {this.setDateOfBirth(event.target.value)}}/>

                <label>Role</label>
                <select onChange={(event) =>{this.setRole(event.target.value)}}>
                    <option onSelect={(event) => this.setRole('STUDENT')}>Student</option>
                    <option onSelect={(event) => this.setRole('PARENT')}>Parent</option>
                    <option onSelect={(event) => this.setRole('COLLEGE_COUNSELOR')}>College Counselor</option>
                </select>

                <button type="button"
                        onClick={() => this.register(this.state.username, this.state.password, this.state.confirmPassword)}>Register</button>
            </div>
        )
    }
}