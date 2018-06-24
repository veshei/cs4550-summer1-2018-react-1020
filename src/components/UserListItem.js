import React from 'react';

export default class UserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                username: '',
                password: '',
                role: ''
            }
        }
    }

    componentDidMount() {
        this.setState({user: this.props.user});
    }

    render() {
        return (<li className="list-group-item">
            <span className="col-2 float-left">{this.state.user.username}</span>
            <span className="col-2 float-left">{this.state.user.role}</span>
            <span className="float-right"><a href={"/profile/" + this.state.user.id}>View Profile</a></span>
        </li>)
    }
}