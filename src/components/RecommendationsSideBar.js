import React from 'react';
import UserService from "../services/UserService";
import RecommendationService from "../services/RecommendationService";
import CollegeService from "../services/CollegeService";

export default class RecommendationSideBar extends React.Component {

  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.recommendationService = RecommendationService.instance;
    this.collegeService = CollegeService.instance;

    this.state = {
      recommendations: [],
      showRecs: false,
      user: undefined,
      listOfColleges: []
    };
  }

  componentDidMount(){
    this.initialize();

  };

  /**
   * Gets the logged in user and sets the state's user to it.
   */
  initialize() {
    this.setState({showRecs:false});
    this.userService.getProfile().then(user => {
      if (user) {
        this.setState({user: user});
        if (this.state.user !== undefined && this.state.user.role === 'STUDENT' ) {
          this.recommendationService.findRecommendationsForStudent()
              .then((result) => {

                    this.setState({recommendations: result});
                    let newList = [];
                    this.state.recommendations.map((recommendation) => {
                      this.collegeService.searchCollegeInfoById(recommendation.collegeId).then((result1) =>{
                        newList.push(result1);
                        this.setState({listOfColleges:newList});
                        if(this.state.listOfColleges.length === this.state.recommendations.length){
                          this.setState({showRecs:true})

                        }
                          })})


                }
                )
        }
      }
    })
  }

  deleteRecommendation(id){
    this.recommendationService.deleteRecommendation(id).then(()=>{
      this.initialize();
    })
  }


  showRecommendations() {
    if(this.state.showRecs) {
      return (
          <div>
            {this.state.recommendations.map((recommendation, index) => {
              return (<div className="form-group list-group">
                <span className="list-group-item active"><h6>{recommendation.title}</h6></span>
                <h6>{
                  recommendation.recommender.username + ' recommended ' +
                  this.state.listOfColleges[index].results[0].school.name}</h6>
                {recommendation.description}
                <button type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.deleteRecommendation(recommendation.id)}>Dismiss</button>
                <br/>
              </div>)
            })}
          </div>)
    }
    else{
      return(<div>No Recommendations</div>)
    }
  }



  toRender(){
    if(this.state.user === undefined || this.state.user.role !== 'STUDENT'){
      return (<div></div>)
    }
    else{
      return (
          <div>
            <h3>Recommendations</h3>
            <hr/>
            {this.showRecommendations()}
          </div>
      )

    }
  }

  render() {
    return (
        this.toRender()
      )
    }


}

