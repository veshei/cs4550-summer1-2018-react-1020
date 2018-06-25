
let _singleton = Symbol();
const LOCAL_URL = 'http://localhost:8080';
const HEROKU_URL = 'https://cs4550-springboot-1020.herokuapp.com';


/**
 * Frontend service for recommendation.
 */
export default class RecommendationService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new RecommendationService(_singleton);
    return this[_singleton];
  }

  /**
   * Finds all recommendations for the college of the given id.
   */
  findRecommendationsForStudent() {
    return fetch(HEROKU_URL + '/api/student/recommendations', {
      credentials: 'include'
    }).then(response => {
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
   * Creates the given recommendation for the currently logged in user.
   * @param recommendation the recommendation to create
   * @return the recommendation created on success, null on failure
   */
  createRecommendation(recommendation) {
    return fetch(HEROKU_URL + '/api/user/recommendation', {
      method: 'POST',
      body: JSON.stringify(recommendation),
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
   * Deletes the recommendation of the given id.
   * @param recommendationId the id of the recommendation
   */
  deleteRecommendation(recommendationId) {
    return fetch(HEROKU_URL + '/api/recommendation/' + recommendationId, {
      method: 'DELETE',
      credentials: 'include'
    });
  }
}