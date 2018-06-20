let _singleton = Symbol();

const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com/';
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
            if (response.ok) {
                return response.json();
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
}