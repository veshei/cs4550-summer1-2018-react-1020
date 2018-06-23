import React from 'react';
import UserService from '../services/UserService';
import AdminUserListItem from './AdminUserListItem';

/**
 * A frontend component for listing users for admins.
 */
export default class AdminUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: '',
            users: []
        }
        this.userService = UserService.instance;
        this.reloadUsers = this.reloadUsers.bind(this);
        this.searchUserByUsername = this.searchUserByUsername.bind(this);
        this.formUpdate = this.formUpdate.bind(this);
    }

    /**
     * Fetches users from the database and sets them to this state's users field.
     */
    reloadUsers() {
        this.userService.findAllUsers().then(users => {
            console.log(users);
            this.setState({users: users});
        });
    }

    /**
     * Searches for users with usernames similar to the current search bar text and sets this component's users
     * field to those users.
     */
    searchUserByUsername() {
        // If the search bar has text in it, search for a user
        if (this.state.searchBar) {
            this.userService.findUsersLikeUsername(this.state.searchBar).then(users => {
                this.setState({users: users});
            });
        } else {
            // Else, find all users
            this.reloadUsers();
        }


    }

    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    componentDidMount() {
        this.reloadUsers();
    }

    render() {
        return (<div>
            <div className="form-group-inline">
                <input type="text"
                       placeholder="Search for a user..."
                       className="form-control col-10"
                       onChange={event => this.formUpdate({searchBar: event.target.value})}/>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.searchUserByUsername}>
                    Search User
                </button>
            </div>

            <ul className="list-group">
                {this.state.users.map((user, idx) => {
                    return <AdminUserListItem user={user}
                                              reloadUsers={this.reloadUsers}
                                              key={idx}/>
                })}
            </ul>
        </div>)
    }
}