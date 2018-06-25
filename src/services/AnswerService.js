import CollegeListService from "./CollegeListService";

let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080';
const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com';

/**
 * A frontend service for answers to questions.
 */
export default class AnswerService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AnswerService(_singleton);
        return this[_singleton];
    }

    /**
     * Returns all answers available in the database.
     * @return all answers available
     */
    findAllAnswers() {
        return fetch(HEROKU_URL + '/api/answer').then(response => {
            return response.json();
        })
    }

    /**
     * Returns all answers associated with the question of the given question id.
     * @param questionId the id of the question
     * @return all answers under that question
     */
    findAllAnswersForQuestion(questionId) {
        return fetch(HEROKU_URL + '/api/question/' + questionId + '/answer').then(response => {
            return response.json();
        });
    }

    /**
     * Posts a new answer to the question of the given question id.
     * @param questionId the id of the question to add a new answer to
     * @param answer the new answer
     * @return the new answer created on success, null on failure
     */
    createNewAnswer(questionId, answer) {
        return fetch(HEROKU_URL + '/api/question/' + questionId + '/answer', {
            method: 'POST',
            body: JSON.stringify(answer),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => {
            return response.json();
        })
    }

    /**
     * Returns the answer associated with the given id.
     * @param answerId the id of the answer
     * @return the answer whose id is the given id
     */
    findAnswerById(answerId) {
        return fetch(HEROKU_URL + '/api/answer/' + answerId).then(response => {
            return response.json();
        });
    }

    /**
     * Deletes the answer whose id is the given one.
     * @param answerId the id of the answer to delete
     */
    deleteAnswer(answerId) {
        return fetch(HEROKU_URL + '/api/answer/' + answerId, {
            method: 'DELETE'
        }).then(response => {
            return response;
        })
    }
}