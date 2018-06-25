import CollegeService from "./CollegeService";

let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080';
const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com/';

/**
 * A frontend service for questions.
 */
export default class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton];
    }

    /**
     * Finds all questions associated with the given college id.
     * @param collegeId the id of the college
     * @return the list of all questions for the college
     */
    findQuestionsForCollege(collegeId) {
        return fetch(LOCAL_URL + '/api/question/college/' + collegeId).then(response => {
            return response.json();
        })
    }

    /**
     * Creates a new question, with the author of the question being the currently logged in user.
     * @param question the new question to create
     * @return the question created on success, null on failure
     */
    createQuestion(question) {
        return fetch(LOCAL_URL + '/api/user/question', {
            method: 'POST',
            body: JSON.stringify(question),
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
            })
        })
    }

    /**
     * Returns the question associated with the given id.
     * @param questionId the id of the question
     * @return the question of the given question id
     */
    findQuestionById(questionId) {
        return fetch(LOCAL_URL + '/api/question/' + questionId).then(response => {
            return response.json();
        })
    }

    /**
     * Deletes the question of the given id.
     * @param questionId the id of the question
     */
    deleteQuestion(questionId) {
        return fetch(LOCAL_URL + '/api/question/' + questionId, {
            method: 'DELETE'
        });
    }
}