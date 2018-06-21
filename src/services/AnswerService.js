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
        return fetch(LOCAL_URL + '/api/answer').then(response => {
            return response.json();
        })
    }

    /**
     * Returns all answers associated with the question of the given question id.
     * @param questionId the id of the question
     * @return all answers under that question
     */
    findAllAnswersForQuestion(questionId) {
        return fetch(LOCAL_URL + '/api/question/' + questionId + '/answer').then(response => {
            return response.json();
        });
    }
}