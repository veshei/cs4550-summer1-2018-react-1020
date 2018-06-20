import React from 'react';
import UserService from '../services/UserService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.userService = UserService.instance;
    }

    /**
     * Sets this state's username to the given string.
     * @param newUsername the new username
     */
    setUsername(newUsername) {
        this.setState({username: newUsername});
    }

    /**
     * Sets this state's password to the given string.
     * @param newPassword the new password
     */
    setPassword(newPassword) {
        this.setState({password: newPassword});
    }

    /**
     * Makes a login request with the given username and password.
     * @param username the username
     * @param password the password
     */
    login(username, password) {
        const credentials = {
            username: username,
            password: password
        };
        this.userService.login(credentials).then(user => {
            if (user) {
                // Redirect back to home
                window.location = '/';
            }
        });
    }

    render() {
        return (
            <div style={{marginLeft:'25%',marginRight:'25%'}}>
              <h1> Login </h1>
              <hr/>
              <label>Username </label>
              <br/>
              <input
                  type="text"
                  className='registerBox'
                  placeholder="Username"
                  onChange={(event) => this.setUsername(event.target.value)}/>
              <br/>
              <label>Password</label>
              <br/>
              <input type="text"
                     className='registerBox'
                     placeholder="Password"
                     onChange={(event) => this.setPassword(event.target.value)}/>
              <br/>
              <button type="button"
              onClick={() => this.login(this.state.username, this.state.password)}>Login</button>
            </div>
        )
    }
}