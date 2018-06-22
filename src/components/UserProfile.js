import React from 'react';
import UserService from '../services/UserService';

/**
 * The user profile component.
 */
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                collegeLists: []
            }, // the user entity stored in the server
            firstName: '', // the first name field
            lastName: '', // the last name field
            dateOfBirth: '', // the date of birth field
            collegeLists: [],
            activeWarning: '',
            showWarning:false
        };
        this.userService = UserService.instance;
        this.formUpdate = this.formUpdate.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    /**
     * Updates this component's state with the given JSON object.
     * @param newFormUpdate the new form update
     */
    formUpdate(newFormUpdate) {
      this.setState({showWarning: false});
      this.setState(newFormUpdate);
    }

    /**
     * Updates the current user information with the information provided in this component's fields.
     */
    saveProfile() {
        this.setState({showWarning: false});
        if(this.state.firstName.length <= 0){
            console.log("GotHere");
            this.setState({activeWarning:'Please enter your first name',
            showWarning: true})
        }
        else if(this.state.lastName.length <= 0){
          this.setState({activeWarning:'Please enter your last name',
            showWarning: true})
        }
        else if(this.state.dateOfBirth.length <=0){
            this.setState({activeWarning:'Please enter your date of birth',
              showWarning: true})
        }
        else if(new Date(this.state.dateOfBirth) >  Date.now()){
          this.setState({activeWarning:'Your birthday cannot be in the future',
            showWarning: true})
        }
        else{
          const updatedUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
          };
          this.userService.updateProfile(updatedUser).then(updatedUser => {
            if (updatedUser) {
              this.setState({user: updatedUser});
              alert("Successfully updated profile!");
            } else {
              console.log('failed to update');
            }
          })
        }
    }
    generateWarning(){
        if(this.state.showWarning && this.state.activeWarning.length > 0){
            return (<div>
              <p className="warningText">{this.state.activeWarning} </p>
            </div>)
        }
    }
    componentDidMount() {
        this.userService.getProfile().then(user => {
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

    getRole(){
      if(this.state.role === 'STUDENT'){
        return 'Student'
      }
      else if(this.state.role === 'PARENT'){
        return 'Parent'
      }
      else{
        return 'College Counselor';
      }
    }
    render() {
        return (<div style={{marginLeft:'25%',marginRight:'25%'}}>
          <h1> Profile</h1>
            <hr/>
          {this.generateWarning()}
          <label>Username</label>
          <br/>
          <input readOnly type="text"
                 className="registerBoxReadOnly"
                 placeholder="Username"
                 value={this.state.user.username}
                 />
          <br/>
          <label>Role</label>
          <br/>
          <input readOnly type="text"
                 className="registerBoxReadOnly"
                 placeholder="Role"
                 value={this.getRole()}
                 />
          <br/>

          <label>First Name</label>
          <br/>
          <input type="text"
                 className="registerBox"
                   placeholder="First Name"
                   value={this.state.firstName}
                   onChange={(event) => {
                       this.formUpdate({firstName: event.target.value})
                   }}/>
          <br/>
          <label>Last Name</label>
          <br/>
          <input type="text"
                 className="registerBox"
                   placeholder="Last Name"
                   value={this.state.lastName}
                   onChange={(event) => {
                       this.formUpdate({lastName: event.target.value})
                   }}/>
          <br/>
          <label>Date of Birth</label>
          <br/>
          <input type="date"
                 className="registerBox"
                   placeholder="Username"
                   value={this.state.dateOfBirth.substring(0,10)}
                   onChange={(event) => {
                       console.log(event.target.value);
                       this.formUpdate({dateOfBirth: event.target.value})
                   }}/>
            {/*TODO college list component*/}
          <br/>
          <button className="btn btn-primary btn-block" onClick={this.saveProfile}>Save</button>
        </div>);
    }
}