import React from 'react';
import CollegeService from '../services/CollegeService';
import CollegeReviewList from './CollegeReviewList';
import WriteReview from "./WriteReview";
import CollegeQuestionList from "./CollegeQuestionList";
import './CollegePage.css';
import UserService from "../services/UserService";
import RecommendationService from "../services/RecommendationService";

/**
 * A component for rendering college information for a particular college.
 */
export default class CollegePage extends React.Component {
    constructor(props) {
        // Required props: collegeId, can be passed through url
        super(props);
        this.state = {
            user: undefined,
            selectedStudent: undefined,
            recommendationTitle: '',
            recommendationDesc: '',
            collegeId: '',
            listOfStudents:[],
            schoolInfo: {}, // information that includes the school and yearly statistics
            school: {}, // information about the school
            raceInfo: {},
            genderInfo: {},
            admissionsInfo: {
                actScores: {
                    '25th-percentile': {
                        writing: '',
                        english: '',
                        math: '',
                        reading: '',
                        science: ''
                    },
                    '75th-percentile': {
                        writing: '',
                        english: '',
                        math: '',
                        reading: '',
                        science: ''
                    }
                },
                admissionRate: '',
                satScores: {
                    '25th-percentile': {
                        criticalReading: '',
                        math: '',
                        writing: ''
                    },
                    '75th-percentile': {
                        criticalReading: '',
                        math: '',
                        writing: '',
                    }
                }
            },
            financialInfo: {
                inStateTuition: '',
                outOfStateTuition: '',
                totalCostOfAttendence: '',
                privateAverageNetPrice: '',
                publicAverageNetPrice: '',
                medianDebt: '',
                percentagePellGrant: '',
            },
            completionInfo: {
                '4YearGraduationRate': ''
            },
            academicsInfo: {
                hasAssociate: false,
                hasBachelor: false
            }
        };
        this.collegeService = CollegeService.instance;
        this.userService = UserService.instance;
        this.recommendationService = RecommendationService.instance;
    }

    componentDidMount() {
        let collegeId = this.props.collegeId;
        if (!collegeId) {
            collegeId = this.props.history.location.state.collegeId;
        }
        if (!collegeId) { // If not passed in as a prop. get from the url
            collegeId = this.props.match.params['collegeId'];
        }
        this.setState({collegeId});
        this.collegeService.searchCollegeInfoById(collegeId).then(schoolJSON => {
            let schoolInfo = schoolJSON.results[0];
            this.setState({
                schoolInfo: schoolInfo,
                school: schoolInfo.school,
                raceInfo: schoolInfo['2015'].student.demographics.race_ethnicity,
                genderInfo: {
                    male: schoolInfo['2015'].student.demographics.men,
                    female: schoolInfo['2015'].student.demographics.women
                },
                admissionsInfo: {
                    actScores: {
                        '25th-percentile': {
                            writing: schoolInfo['2015'].admissions.act_scores['25th_percentile'].writing,
                            english: schoolInfo['2015'].admissions.act_scores['25th_percentile'].english,
                            math: schoolInfo['2015'].admissions.act_scores['25th_percentile'].math,
                            cumulative: schoolInfo['2015'].admissions.act_scores['25th_percentile'].cumulative
                        },
                        '75th-percentile': {
                            writing: schoolInfo['2015'].admissions.act_scores['75th_percentile'].writing,
                            english: schoolInfo['2015'].admissions.act_scores['75th_percentile'].english,
                            math: schoolInfo['2015'].admissions.act_scores['75th_percentile'].math,
                            cumulative: schoolInfo['2015'].admissions.act_scores['75th_percentile'].cumulative
                        }
                    },
                    admissionRate: schoolInfo['2015'].admissions.admission_rate.overall,
                    satScores: {
                        '25th-percentile': {
                            criticalReading: schoolInfo['2015'].admissions.sat_scores['25th_percentile'].critical_reading,
                            math: schoolInfo['2015'].admissions.sat_scores['25th_percentile'].math,
                            writing: schoolInfo['2015'].admissions.sat_scores['25th_percentile'].writing
                        },
                        '75th-percentile': {
                            criticalReading: schoolInfo['2015'].admissions.sat_scores['75th_percentile'].critical_reading,
                            math: schoolInfo['2015'].admissions.sat_scores['75th_percentile'].math,
                            writing: schoolInfo['2015'].admissions.sat_scores['75th_percentile'].writing
                        }
                    }
                },
                financialInfo: {
                    inStateTuition: schoolInfo['2015'].cost.tuition.in_state,
                    outOfStateTuition: schoolInfo['2015'].cost.tuition.out_of_state,
                    totalCostOfAttendence: schoolInfo['2015'].cost.attendance.academic_year,
                    privateAverageNetPrice: schoolInfo['2015'].cost.avg_net_price.private,
                    publicAverageNetPrice: schoolInfo['2015'].cost.avg_net_price.public,
                    medianDebt: schoolInfo['2015'].aid.median_debt_suppressed.overall,
                    percentagePellGrant: schoolInfo['2015'].aid.pell_grant_rate,
                },
                completionInfo: {
                    '4YearGraduationRate': schoolInfo['2015'].completion['4_yr_completion'].overall
                },
                academicsInfo: {
                    hasAssociate: schoolInfo['2015'].academics.program_available.assoc,
                    hasBachelor: schoolInfo['2015'].academics.program_available.bachelors
                }
            });
        });

        this.userService.findAllUsers().then(response =>{
          let listOfStudents = [];
          response.map((student) => {
            if (student.role === 'STUDENT') {
              listOfStudents.push(student);
            }
          });
          this.setState({listOfStudents: listOfStudents})
          this.setState({selectedStudent: listOfStudents[0]})
        });

        this.getLoggedInUser();
    };

    /**
     * Gets the logged in user and sets the state's user to it.
     */
    getLoggedInUser() {
      this.userService.getProfile().then(user => {
        if (user) {
          this.setState({user: user});
        }
      })
    }

    createRecommendation(){
      if(this.state.recommendationTitle.length <= 0){
        alert('Please include a title for your recommendation');
      }
      else if(this.state.recommendationTitle.length <= 0){
        alert('Please include a description for your recommendation');
      }
      else{
        let recommendation = {
          title: this.state.recommendationTitle,
          description: this.state.recommendationDesc,
          collegeId: this.state.collegeId,
          student: this.state.selectedStudent
        };
        this.recommendationService.createRecommendation(recommendation);
        alert('Recommendation Created!');

      }
    }
    generateRecommendationsColumn(){
      if(this.state.user !== undefined){
        if(this.state.user.role !== 'STUDENT'){
          return(
              <div>
                <h1>Recommend To A Student</h1>
                <hr/>
                <label><h6>Title</h6></label>
                <br/>
                <input type="text"
                       style={{paddingLeft:'5px'}}
                       className="registerBox"
                       placeholder="Title"
                       onChange={(event) => this.setState({recommendationTitle:event.target.value})}/>
                <br/>
                <label><h6>Description</h6></label>
                <br/>
                <input type="text"
                       style={{paddingLeft:'5px'}}
                       className="registerBox"
                       placeholder="Description"
                       onChange={(event) => this.setState({recommendationDesc:event.target.value})}/>
                <br/>
                <label>Student</label>
                <br/>
                <select className="registerBox" onChange={(event) =>
                {this.setState({selectedStudent:this.state.listOfStudents[event.target.value]})}}>
                  {this.state.listOfStudents.map((student,index) =>{
                    return(<option key={index} value={index} label={student.username}/>)
                  })}
                </select>
                <br/>
                <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => {this.createRecommendation()}}>Recommend</button>

              </div>
          )

        }
      }


    }

    render() {
        return (

            <div className="container">
            <div className="container col-8">

                    <div className="container-fluid col-12">
                        <h1>{this.state.school.name}</h1>
                        <h4>{this.state.school.city}, {this.state.school.state}</h4>
                        <h4><a href={"//" + this.state.school.school_url}>{this.state.school.school_url}</a></h4>

                        <div className="container-fluid list-group section-info border">
                            <li className="list-group-item active"><h4>Admissions Statistics</h4></li>

                            <div className="admission-rate-info col-3">
                                <h3><span
                                    className="admission-rate-label">Admission Rate:</span> {(this.state.admissionsInfo.admissionRate * 100).toFixed(2)}%
                                </h3>
                            </div>
                            <div>
                                <div className="container">
                                <span className="score-info-left list-group col-6">
                                    <li className="list-group-item active"><h5>ACT Scores</h5></li>
                                    <li className="list-group-item act-card">
                                        <div className="container specific-score-info">
                                            <ul className="list-group score-info col-5">
                                                <li className="list-group-item active">25th percentile</li>
                                                <li className="list-group-item">English: {this.state.admissionsInfo.actScores['25th-percentile'].english}</li>
                                                <li className="list-group-item">Math: {this.state.admissionsInfo.actScores['25th-percentile'].math}</li>
                                                <li className="list-group-item">Writing: {this.state.admissionsInfo.actScores['25th-percentile'].writing}</li>
                                                <li className="list-group-item">Cumulative: {this.state.admissionsInfo.actScores['25th-percentile'].cumulative}</li>
                                            </ul>
                                            <ul className="list-group score-info col-5">
                                                <li className="list-group-item active">75th percentile</li>
                                                <li className="list-group-item">English: {this.state.admissionsInfo.actScores['75th-percentile'].english}</li>
                                                <li className="list-group-item">Math: {this.state.admissionsInfo.actScores['75th-percentile'].math}</li>
                                                <li className="list-group-item">Writing: {this.state.admissionsInfo.actScores['75th-percentile'].writing}</li>
                                                <li className="list-group-item">Cumulative: {this.state.admissionsInfo.actScores['75th-percentile'].cumulative}</li>
                                            </ul>
                                        </div>
                                    </li>
                                </span>

                                    <span className="score-info list-group col-6">
                                    <li className="list-group-item active"><h5>SAT Scores</h5></li>
                                    <li className="list-group-item">
                                        <div className="container specific-score-info">
                                            <ul className="list-group score-info col-5">
                                                <li className="list-group-item active">25th percentile</li>
                                                <li className="list-group-item">Critical
                                                    Reading: {this.state.admissionsInfo.satScores['25th-percentile'].criticalReading}</li>
                                                <li className="list-group-item">Math: {this.state.admissionsInfo.satScores['25th-percentile'].math}</li>
                                                <li className="list-group-item">Writing: {this.state.admissionsInfo.satScores['25th-percentile'].writing}</li>
                                            </ul>

                                            <ul className="list-group score-info col-5">
                                                <li className="list-group-item active">75th percentile</li>
                                                <li className="list-group-item">Critical
                                                    Reading: {this.state.admissionsInfo.satScores['75th-percentile'].criticalReading}</li>
                                                <li className="list-group-item">Math: {this.state.admissionsInfo.satScores['75th-percentile'].math}</li>
                                                <li className="list-group-item">Writing: {this.state.admissionsInfo.satScores['75th-percentile'].writing}</li>
                                            </ul>
                                        </div>
                                    </li>
                                </span>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid list-group section-info border">
                            <li className="list-group-item active"><h4>Demographics</h4></li>
                            <div className="container">
                              <span className="demographic-info-left list-group col-6">
                                <li className="list-group-item active"><h6>Race Demographics</h6></li>
                                    <li className="list-group-item">Percent White: {(this.state.raceInfo.white * 100).toFixed(2)}%</li>
                                    <li className="list-group-item">Percent Asian: {(this.state.raceInfo.asian * 100).toFixed(2)}%</li>
                                    <li className="list-group-item">Percent Black: {(this.state.raceInfo.black * 100).toFixed(2)}%</li>
                                    <li className="list-group-item">Percent Hispanic: {(this.state.raceInfo.hispanic * 100).toFixed(2)}%</li>
                                    <li className="list-group-item">Percent Mixed: {(this.state.raceInfo.two_or_more * 100).toFixed(2)}%</li>
                                    <li className="list-group-item">Percent Unknown: {(this.state.raceInfo.unknown * 100).toFixed(2)}%</li>
                            </span>
                                <span className="demographic-info list-group col-6">
                                <li className="list-group-item active"><h6>Male-Female Ratio</h6></li>
                                        <li className="list-group-item">Percent Male: {(this.state.genderInfo.male * 100).toFixed(2)}%</li>
                                        <li className="list-group-item">Percent Female: {(this.state.genderInfo.female * 100).toFixed(2)}%</li>
                            </span>
                            </div>
                        </div>

                        <div className="container-fluid list-group section-info border">
                            <li className="list-group-item active"><h4>Financial Information</h4></li>
                            <li className="list-group-item">In-state tuition:
                                ${this.state.financialInfo.inStateTuition}</li>
                            <li className="list-group-item">Out-of-state tuition:
                                ${this.state.financialInfo.outOfStateTuition}</li>
                            <li className="list-group-item">Private average net price:
                                ${this.state.financialInfo.privateAverageNetPrice}</li>
                            {this.state.financialInfo.publicAverageNetPrice
                            && <li className="list-group-item">Public average net price:
                                ${this.state.financialInfo.publicAverageNetPrice}</li>}
                            <li className="list-group-item">Median debt: ${this.state.financialInfo.medianDebt}</li>
                            <li className="list-group-item">Percentage of Pell Grant
                                recipients: {(this.state.financialInfo.percentagePellGrant * 100).toFixed(2)}%
                            </li>
                        </div>

              <div className="container-fluid list-group section-info border">
                <li className="list-group-item active"><h4>Academic Information</h4></li>
                <li className="list-group-item">4-year graduation
                  rate: {this.state.completionInfo['4YearGraduationRate']}</li>
                <li className="list-group-item">Associate's Degree Available:
                  {this.state.academicsInfo.hasAssociate ? ' Yes' : ' No'}</li>
                <li className="list-group-item">Bachelor's Degree Available:
                  {this.state.academicsInfo.hasBachelor ? ' Yes' : ' No'}</li>
              </div>

            </div>


            </div>

              <div className="container col-6 ">
                <div style={{width:'50%'}}>
                {this.generateRecommendationsColumn()}
                <div className="user-section">
                  <CollegeReviewList collegeId={this.state.collegeId}/>
                  <CollegeQuestionList collegeId={this.state.collegeId}
                                       history={this.props.history}/>
                </div>


                </div>
              </div>

            </div>
        )
    }
}