import React from 'react';
import UserService from "../services/UserService";
import UserListItem from './UserListItem';

export default class SearchUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: '',
            users: []
        }
        this.userService = UserService.instance;
        this.formUpdate = this.formUpdate.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }

    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    searchUser() {
        if (this.state.searchBar) {
            this.userService.findUsersLikeUsername(this.state.searchBar).then(users => {
                this.setState({users: users});
            });
        } else {
            this.userService.findAllUsers().then(users => {
                this.setState({users: users});
            });
        }
    }

    render() {
        return (<div className="container-fluid user-list col-8">
            <div className="form-inline">
                <input type="text"
                       placeholder="Search for a user by username..."
                       onChange={event => this.formUpdate({searchBar: event.target.value})}
                       className="form-control col-10"/>
                <button type="button"
                        className="btn btn-success col-2"
                        onClick={this.searchUser}>
                    Search User
                </button>
            </div>
                <ul className="list-group user-list">
                    {this.state.users.map((user, idx) => {
                        return <UserListItem user={user}
                                             key={idx}/>
                    })}
                </ul>

        </div>);
    }
}