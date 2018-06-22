import UserService from "./UserService";

let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080';
const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com';


/**
 * Frontend service for reviews.
 */
export default class ReviewService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ReviewService(_singleton);
        return this[_singleton];
    }

    /**
     * Finds all reviews for the college of the given id.
     * @param collegeId the id of the college
     */
    findReviewsForCollege(collegeId) {
        return fetch(HEROKU_URL + '/api/review/college/' + collegeId).then(response => {
            return response.text().then(text => {
                if (text) {
                    return JSON.parse(text);
                } else {
                    return [];
                }
            })
        })
    }

    /**
     * Creates the given review for the currently logged in user.
     * @param review the review to create
     * @return the review created on success, null on failure
     */
    createReview(review) {
        return fetch(LOCAL_URL + '/api/review', {
            method: 'POST',
            body: JSON.stringify(review),
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

    /**
     * Deletes the review of the given id.
     * @param reviewId the id of the review
     */
    deleteReview(reviewId) {
        return fetch(HEROKU_URL + '/api/review/' + reviewId, {
            method: 'DELETE',
            credentials: 'include'
        });
    }
}