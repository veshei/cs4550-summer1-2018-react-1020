let _singleton = Symbol();
const API_KEY = 'EnO9tP0aSe2lkcXWzZzJ2tBJnYzUke0QTzVbd1qE';
const COLLEGE_API_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools?' +
    'api_key=' + API_KEY + '&';

/**
 * A frontend service for getting college information.
 */
export default class CollegeService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CollegeService(_singleton);
        return this[_singleton];
    }

    /**
     * Searches for colleges by name based on the given search term. Returns college information in the default
     * format set up by the College API.
     * @param collegeName the name of the college to search form
     * @return a list of JSON objects for the colleges similar to that name
     */
    searchCollegeByName(collegeName) {
        return fetch(COLLEGE_API_URL + 'school.name=' + collegeName).then(response => {
            return response.json();
        });
    }
}