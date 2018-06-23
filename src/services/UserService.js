let _singleton = Symbol();

const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com';
const LOCAL_URL = 'http://localhost:8080';

/**
 * Frontend service for users.
 */
export default class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton];
    }

    /**
     * Logs the user in with the given credentials.
     * @param credentials the credentials in JSON form
     * @return the user, if login is successful
     */
    login(credentials) {
        return fetch(LOCAL_URL + '/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => {
            if (response.status === 200) {
                return response.text();
            }
            return null;
        })
    }

    /**
     * Registers a new user with the given credentials.
     * @param credentials the credentials in JSON object form
     * @return the user, if registration is successful
     */
    register(credentials) {
        return fetch(LOCAL_URL + '/api/register', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return null;
        });
    }

    /**
     * Logs the currently logged in user out.
     */
    logout() {
        return fetch(LOCAL_URL + '/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
    }

    /**
     * Returns the currently logged in user.
     */
    getProfile() {
        return fetch(LOCAL_URL + '/api/profile', {
            credentials: 'include'
            }
        ).then(response => {
            return response.text().then(text => {
                if (text) {
                    return JSON.parse(text);
                }
                return null;
            })
        })
    }

    /**
     * Updates the information of the currently logged in user with the information encoded in the given JSON object.
     * @param updatedUser the updated user info
     */
    updateProfile(updatedUser) {
        return fetch(LOCAL_URL + '/api/profile', {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => {
            return response.text().then(text => {
                if (text) {
                    return JSON.parse(text);
                } else {
                    return null;
                }
            })
        })
    }

  /**
   * Finds a user by a username
   * @param username
   * @returns {Promise<Response>} Returns the user if that username exists, null otherwise
   */
    findUserByUsername(username){
        return fetch(LOCAL_URL + '/api/username/' + username)
            .then(response => {
              if(response.status === 200){
                  console.log('response susccessful');
                return response.json
              }
              else{
                return null;
              }
            }).catch(err => {
                return null;
            })
    }

    /**
     * Creates a new user but doesn't login that user in.
     * @param newUser the new user
     * @return the new user created on success, null on failure
     */
    createUser(newUser) {
        return fetch(LOCAL_URL + '/api/user', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        })
    }

    /**
     * Returns all users in the database.
     * @return a list of all the users in the database
     */
    findAllUsers() {
        return fetch(LOCAL_URL + '/api/user').then(response => {
            return response.json();
        });
    }

    /**
     * Deletes the user of the given user id.
     * @param userId the id of the user
     */
    deleteUserById(userId) {
        return fetch(LOCAL_URL + '/api/user/' + userId, {
            method: 'DELETE'
        });
    }

    /**
     * Returns a list of users that have a similar username to the one given.
     * @param username
     */
    findUsersLikeUsername(username) {
        return fetch(LOCAL_URL + '/api/user/' + username + '/similar').then(response => {
            return response.json();
        })
    }

    /**
     * Returns the user of the given id.
     * @param userId
     */
    findUserById(userId) {
        return fetch(LOCAL_URL + '/api/user/' + userId).then(response => {
            return response.json();
        })
    }

    /**
     * Updates the information of the user whose id is the given user id. The updated information is in the
     * passed in user object.
     * @param userId the id of the user
     * @param updatedUser the updated user information
     * @return the updated user on successful save, null on failure
     */
    updateUserById(userId, updatedUser) {
        console.log(userId);
        return fetch(LOCAL_URL + '/api/user/' + userId, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.text().then(text => {
                if (text) {
                    return JSON.parse(text);
                }
                return null;
            })
        })
    }
}