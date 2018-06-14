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
            collegeLists: []
        }
        this.userService = UserService.instance;
        this.formUpdate = this.formUpdate.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    /**
     * Updates this component's state with the given JSON object.
     * @param newFormUpdate the new form update
     */
    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    /**
     * Updates the current user information with the information provided in this component's fields.
     */
    saveProfile() {
        const updatedUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
        };
        this.userService.updateProfile(updatedUser).then(updatedUser => {
            if (updatedUser) {
                this.setState({user: updatedUser});
            } else {
                console.log('failed to update');
            }
        })
    }

    componentDidMount() {
        this.userService.getProfile().then(user => {
            this.setState({
                user: user,
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth,
                collegeLists: user.collegeLists
            })
        })
    }

    render() {
        return (<div>
            <label>Username: </label>
            <input readonly type="text"
                   placholder="Username"
                   value={this.state.user.username}
                   onChange={(event) => {
                       this.formUpdate({username: event.target.value})
                   }}/>

            <label>First Name: </label>
            <input type="text"
                   placholder="First Name"
                   value={this.state.firstName}
                   onChange={(event) => {
                       this.formUpdate({firstName: event.target.value})
                   }}/>

            <label>Last Name: </label>
            <input type="text"
                   placholder="Last Name"
                   value={this.state.lastName}
                   onChange={(event) => {
                       this.formUpdate({lastName: event.target.value})
                   }}/>

            <label>Date of Birth: </label>
            <input type="text"
                   placholder="Username"
                   value={this.state.dateOfBirth}
                   onChange={(event) => {
                       this.formUpdate({dateOfBirth: event.target.value})
                   }}/>
            {/*TODO college list component*/}
            <button onClick={this.saveProfile}>Save</button>
        </div>);
    }
}