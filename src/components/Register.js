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
            role: 'STUDENT',
            dateOfBirth:'',
            checkUsernameLock: true,
            usernameAvailable:true
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
        this.setState({username: newUsername,checkUsernameLock: true});
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
            this.setState({role: 'PARENT'});
        }
        else if(newRole === 'Student') {
            this.setState({role: 'STUDENT'});
        }
        else if(newRole=== 'College Counselor'){
            this.setState({role: 'COLLEGE_COUNSELOR'})
        } else if (newRole === 'Admin') {
            this.setState({role: 'ADMIN'});
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
     */
    register() {
        if(this.state.usernameAvailable && this.state.username.length > 0
        && this.state.password.length > 0 && this.state.confirmPassword === this.state.password &&
        this.state.firstName.length > 0 && this.state.lastName.length >0 &&
        this.state.dateOfBirth.length > 0){
          const credentials = {
              username: this.state.username,
              password: this.state.password,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              role: this.state.role,
              dateOfBirth: this.state.dateOfBirth

            };

          this.userService.register(credentials).then(user => {


                // Redirect back to home
                if (user) {
                    window.location = '/';
                }
            });



        }

        else{
          alert('One more fields is incorrect!');
        }
    }
    //Puts text to notify the user of the acceptability of their username
    checkUsername(){
      if(this.state.username.length > 0 && this.state.checkUsernameLock) {
        this.setState({checkUsernameLock: false});
        if (this.state.username !== '') {
          this.userService.findUserByUsername(this.state.username)
              .then((response) => {
                if (response != null) {
                  this.setState({usernameAvailable: false})

                }
                else {
                  this.setState({usernameAvailable: true})
                }
              })
        }
      }

      if(this.state.username.length <= 0){
        return (
            <div>
              <p className="warningText">Please enter a username</p>
            </div>)
      }
      else if(this.state.usernameAvailable) {

        return(
            <div>
              <p className="acceptableText">Username is available!</p>
            </div>
        )
      }
      else if(this.state.usernameAvailable === false) {
        return(
            <div>
              <p className="warningText">That username is taken</p>
            </div>
        )
      }


    }

  //Puts text to notify the user of the acceptability of their password
  checkPassword(){
    if(this.state.password.length <= 0){
      return (
          <div>
            <p className="warningText">Please enter a password</p>
          </div>)
    }
  }

  //Puts text to notify the user of the acceptability of their confirmation password
  checkVerifyPassword(){
    if(this.state.password !== this.state.confirmPassword || this.state.password.length <= 0){
      return (
          <div>
            <p className="warningText">Passwords must match</p>
          </div>)
    }

  }

  //Puts text to notify the user of the acceptability of their first name
  checkFirstName(){
    if(this.state.firstName.length <= 0){
      return (
          <div>
            <p className="warningText">Please enter your first name </p>
          </div>)
    }
  }

  //Puts text to notify the user of the acceptability of their last name
  checkLastName(){
    if(this.state.lastName.length <= 0){
      return (
          <div>
            <p className="warningText">Please enter your last name </p>
          </div>)
    }
  }

  //Puts text to notify the user of the acceptability of their last name
  checkDOB(){
    if(this.state.dateOfBirth.length <= 0){
      return (
          <div>
            <p className="warningText">Please enter your date of birth </p>
          </div>)
    }
    else if(new Date(this.state.dateOfBirth) >  Date.now()){
      return (
          <div>
            <p className="warningText">You cannot be born in the future </p>
          </div>)
    }
  }
    render() {
        return(
            <div style={{marginLeft:'25%',marginRight:'25%'}}>
              <h2>Registration</h2>
              <hr/>
              <label>Username </label>
              <br/>
              <input type="text"
                     className="registerBox"
                     placeholder="Username"
                     onChange={(event) => this.setUsername(event.target.value)}/>
              <br/>
              {this.checkUsername()}
              <label>Password</label>
              <br/>
              <input type="password"
                     className="registerBox"
                     placeholder="Password"
                     onChange={(event) => this.setPassword(event.target.value)}/>
              {this.checkPassword()}
              <br/>
              <label>Confirm password</label>
              <br/>
              <input type="password"
                     className="registerBox"
                     placeholder="Password"
                     onChange={(event) => {this.setConfirmPassword(event.target.value)}}/>
              {this.checkVerifyPassword()}
              <br/>
              <label>First Name</label>
              <br/>
              <input type="text"
                     className="registerBox"
                     placeholder="First Name"
                     onChange={(event) => {this.setFirstName(event.target.value)}}/>
              {this.checkFirstName()}
              <br/>
              <label>Last Name</label>
              <br/>
              <input type="text"
                     className="registerBox"
                     placeholder="Last Name"
                     onChange={(event) => {this.setLastName(event.target.value)}}/>
              {this.checkLastName()}
              <br/>
              <label>Date of Birth</label>
              <br/>
              <input type="date"
                     className="registerBox"
                     onChange={(event) => {this.setDateOfBirth(event.target.value)}}/>
              {this.checkDOB()}
              <br/>
              <label>Role</label>
              <br/>
              <select className="registerBox" onChange={(event) =>{this.setRole(event.target.value)}}>
                  <option>Student</option>
                  <option>Parent</option>
                  <option>College Counselor</option>
                  <option>Admin</option>
              </select>
              <br/>
              <button type="button"
                      className="btn btn-primary btn-block"
                      onClick={() => this.register()}>Register</button>
          </div>
        )
    }
}