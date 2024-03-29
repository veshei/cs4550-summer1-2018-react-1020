import React from 'react';
import UserService from "../services/UserService";

/**
 * An entry in the admin user list.
 */
export default class AdminUserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                username: ''
            }
        }
        this.userService = UserService.instance;
        this.deleteUser = this.deleteUser.bind(this);
        this.navigateToEditUserProfile = this.navigateToEditUserProfile.bind(this);
    }

    /**
     * Deletes this user from the database and reloads the users if the reload users function is available in this
     * component.
     */
    deleteUser() {
        this.userService.deleteUserById(this.state.user.id).then(() => {
            if (this.props.reloadUsers) {
                this.props.reloadUsers();
            }
        })
    }


    /**
     * Navigates to the page to edit a user's profile.
     */
    navigateToEditUserProfile() {
        this.props.history.push('/admin/dashboard/user/' + this.state.user.id + '/edit');
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            user: newProps.user
        })
    }

    render() {
        return (<li className="list-group-item">
            <button type="button"
                    className="btn btn-danger float-right"
            onClick={this.deleteUser}>
                Delete
            </button>
            <button type="button"
                    onClick={this.navigateToEditUserProfile}
                    className="btn btn-primary float-right">
                Edit
            </button>
            {this.state.user.username}
        </li>);
    }
}