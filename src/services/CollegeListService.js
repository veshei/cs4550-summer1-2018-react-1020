import ReviewService from "./ReviewService";

let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080';
const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com';
export default class CollegeListService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CollegeListService(_singleton);
        return this[_singleton];
    }

    deleteCollegeList(collegeListId) {
        return fetch(LOCAL_URL + '/api/collegeList/' + collegeListId, {
            method: 'DELETE',
            credentials: 'include'
        }).then(response => {
            return response;
        });
    }

    addCollege(collegeList) {
        return fetch(LOCAL_URL + '/api/addCollege/' + collegeList.id, {
            method: 'PUT',
            body: JSON.stringify(collegeList),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(function(response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
            return null;
        });
    }

    deleteCollege(collegeList) {
        return fetch(LOCAL_URL + '/api/deleteCollege/' + collegeList.id, {
            method: 'PUT',
            body: JSON.stringify(collegeList),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(function(response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
            return null;
        });
    }

    findCollegeListForUser() {
        return fetch(LOCAL_URL + '/api/user/collegeList', {
                credentials: 'include'
            }
        ).then(function(response) {
            if (response.ok) {
                return response.json();
            }
            return null;
        });
    }

    createCollegeList(collegeList) {
        return fetch(LOCAL_URL + '/api/user/collegeList', {
            method: 'POST',
            body: JSON.stringify(collegeList),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(function(response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
            return null;
        });
    }
}