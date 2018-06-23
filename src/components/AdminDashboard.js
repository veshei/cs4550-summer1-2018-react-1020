import React from 'react';
import CreateNewUserForm from './CreateNewUserForm';
import UserService from '../services/UserService';

/**
 * An component for admin user functions like banning users, creating users, etc.
 */
export default class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        // Check if the currently logged in user is an admin
        this.userService = UserService.instance;
        this.userService.getProfile().then(user => {
            if (!user) {
                this.props.history.push('/'); // redirect them back home
            } else if (user.role !== 'ADMIN') {
                this.props.history.push('/');
            }
        })
        this.navigateToCreateUser = this.navigateToCreateUser.bind(this);
    }

    navigateToCreateUser() {
        this.props.history.push('/admin/dashboard/user/create')
    }

    render() {
        return (<div className="container-fluid col-8">
        <button onClick={this.navigateToCreateUser}
                className="btn btn-success">
            Create New User
        </button>

        // User search bar
        // List of users (with delete and edit buttons)
            </div>
        )
    }
}