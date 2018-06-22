import React from 'react';
import UserService from '../services/UserService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginAttempt: false,
            badCredentials: false
        };
        this.userService = UserService.instance;
    }

    /**
     * Sets this state's username to the given string.
     * @param newUsername the new username
     */
    setUsername(newUsername) {
        this.setState({badCredentials:false});
        this.setState({username: newUsername});
    }

    /**
     * Sets this state's password to the given string.
     * @param newPassword the new password
     */
    setPassword(newPassword) {
        this.setState({badCredentials:false});
        this.setState({password: newPassword});
    }

    /**
     * Makes a login request with the given username and password.
     * @param username the username
     * @param password the password
     */
    login(username, password) {
      this.setState({badCredentials:false});
      this.setState({loginAttempt: true});
      if(username.length > 0 && password.length > 0) {
        const credentials = {
          username: username,
          password: password
        };
        this.userService.login(credentials).then(user => {
          if (user) {
            // Redirect back to home
            window.location = '/';
          }
          else{
            this.setState({badCredentials:true});
            console.log(this.state.badCredentials);
          }
        });
      }
    }
  //Puts text to notify the user of the acceptability of their password
  checkUsername(){
    if(this.state.username.length <= 0 && this.state.loginAttempt){
      return (
          <div>
            <p className="warningText">Please enter a username</p>
          </div>)
    }
  }

    //Puts text to notify the user of the acceptability of their password
    checkPassword(){
      if(this.state.password.length <= 0 && this.state.loginAttempt){
        return (
            <div>
              <p className="warningText">Please enter a password</p>
            </div>)
      }
    }

  //Puts text to notify the user of the acceptability of their credentials
  credentialsWarning(){
    if(this.state.badCredentials){
      return (
          <div>
            <p className="warningText">Your username or password is incorrect!</p>
          </div>)
    }
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
              {this.checkUsername()}
              <br/>
              <label>Password</label>
              <br/>
              <input type="password"
                     className='registerBox'
                     placeholder="Password"
                     onChange={(event) => this.setPassword(event.target.value)}/>
              {this.checkPassword()}
              <br/>
              <button type="button" className="btn btn-primary btn-block"
              onClick={() => this.login(this.state.username, this.state.password)}>Login</button>
              <br/>
              {this.credentialsWarning()}
            </div>
        )
    }
}