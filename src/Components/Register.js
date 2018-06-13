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
            role: 'Student'
        }
        this.userService = UserService.instance;
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
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
        this.setState({role: newRole});
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
                password: password
            };
            this.userService.register(credentials).then(user => {
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

                <label>Role</label>
                <input type="select">
                    <select onSelect={(event) => this.setRole('Student')}>Student</select>
                    <select onSelect={(event) => this.setRole('Parent')}>Parent</select>
                    <select onSelect={(event) => this.setRole('Counselor')}>Counselor</select>
                </input>

                <button type="button"
                        onClick={() => this.register(this.state.username, this.state.password, this.state.confirmPassword)}>Register</button>
            </div>
        )
    }
}