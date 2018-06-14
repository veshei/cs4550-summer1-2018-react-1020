import ReviewService from "./ReviewService";

let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080';
const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com/';
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

    createCollegeList(collegeList) {
        return fetch(HEROKU_URL + '/api/collegeList', {
            method: 'POST',
            body: JSON.stringify(collegeList),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => {
            return response.text().then(text => {
                if (text) {
                    return JSON.parse(text);
                }
                return null;
            });
        });
    }
}