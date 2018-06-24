import React from 'react'
import UserService from "../services/UserService";

export default class ViewOnlyUserProfile extends React.Component {
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
        };
        this.userService = UserService.instance;
        this.getRole = this.getRole.bind(this);
    }

    componentDidMount() {
        let userId;
        if (this.props.match.params['userId']) {
            userId = this.props.match.params['userId'];
        } else {
            userId = this.props.userId;
        }
        this.userService.findUserById(userId).then(user => {
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
        else if (this.state.role === 'COLLEGE_COUNSELOR') {
            return 'College Counselor';
        } else {
            return 'Admin';
        }
    }

    render() {
        return (<div style={{marginLeft: '25%', marginRight: '25%'}}>
            <h1> Profile</h1>
            <hr/>
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
                   className="registerBoxReadOnly"
                   placeholder="First Name"
                   value={this.state.firstName}
            readonly/>
            <br/>
            <label>Last Name</label>
            <br/>
            <input type="text"
                   className="registerBoxReadOnly"
                   placeholder="Last Name"
                   value={this.state.lastName}
            readonly/>
            <br/>
            <label>Date of Birth</label>
            <br/>
            <input readonly type="date"
                   className="registerBoxReadOnly"
                   placeholder="Username"
                   value={this.state.dateOfBirth.substring(0, 10)}
            />
            <br/>
        </div>);
    }
}