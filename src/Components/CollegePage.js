import React from 'react';
import CollegeService from '../services/CollegeService';
import CollegeReviewList from './CollegeReviewList';

/**
 * A component for rendering college information for a particular college.
 */
export default class CollegePage extends React.Component {
    constructor(props) {
        // Required props: collegeId, can be passed through url
        super(props);
        this.state = {
            collegeId: '',
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
            }
        };
        this.collegeService = CollegeService.instance;
        let collegeId = this.props.collegeId;
        if (!collegeId) { // If not passed in as a prop. get from the url
            collegeId = this.props.match.params['collegeId'];
            this.state.collegeId = collegeId;
        }
    }

    componentDidMount() {
        let collegeId = this.props.collegeId;
        if (!collegeId) { // If not passed in as a prop. get from the url
            collegeId = this.props.match.params['collegeId'];
            this.state.collegeId = collegeId;
        }
        this.collegeService.searchCollegeInfoById(collegeId).then(schoolJSON => {
            let schoolInfo = schoolJSON.results[0];
            console.log(schoolInfo['2015']);
            console.log(schoolInfo);
            this.setState({
                collegeId: this.props.collegeId,
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
                            math:  schoolInfo['2015'].admissions.sat_scores['75th_percentile'].math,
                            writing:  schoolInfo['2015'].admissions.sat_scores['75th_percentile'].writing
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
                }
            });
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.school.name}</h1>
                <h4>{this.state.school.city}, {this.state.school.state}</h4>
                <h4><a href={"//" + this.state.school.school_url}>{this.state.school.school_url}</a></h4>

                <div>
                    <h3>Admissions Statistics</h3>
                    <div>
                        <h4>Admission Rate: {(this.state.admissionsInfo.admissionRate * 100).toFixed(2)}%</h4>
                        <h4>ACT scores</h4>
                        <div>
                            <h4>25th percentile</h4>
                            <ul>
                                <li>English: {this.state.admissionsInfo.actScores['25th-percentile'].english}</li>
                                <li>Math: {this.state.admissionsInfo.actScores['25th-percentile'].math}</li>
                                <li>Writing: {this.state.admissionsInfo.actScores['25th-percentile'].writing}</li>
                                <li>Cumulative: {this.state.admissionsInfo.actScores['25th-percentile'].cumulative}</li>
                            </ul>

                            <h4>75th percentile</h4>
                            <ul>
                                <li>English: {this.state.admissionsInfo.actScores['75th-percentile'].english}</li>
                                <li>Math: {this.state.admissionsInfo.actScores['75th-percentile'].math}</li>
                                <li>Writing: {this.state.admissionsInfo.actScores['75th-percentile'].writing}</li>
                                <li>Cumulative: {this.state.admissionsInfo.actScores['75th-percentile'].cumulative}</li>
                            </ul>
                        </div>

                        <h4>SAT scores</h4>
                        <div>
                            <h4>25th percentile</h4>
                            <ul>
                                <li>Critical Reading: {this.state.admissionsInfo.satScores['25th-percentile'].criticalReading}</li>
                                <li>Math: {this.state.admissionsInfo.satScores['25th-percentile'].math}</li>
                                <li>Writing: {this.state.admissionsInfo.satScores['25th-percentile'].writing}</li>
                            </ul>
                        </div>

                        <div>
                            <h4>75th percentile</h4>
                            <ul>
                                <li>Critical Reading: {this.state.admissionsInfo.satScores['75th-percentile'].criticalReading}</li>
                                <li>Math: {this.state.admissionsInfo.satScores['75th-percentile'].math}</li>
                                <li>Writing: {this.state.admissionsInfo.satScores['75th-percentile'].writing}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Demographics</h3>
                    <div>
                        <h4>Male-Female Ratio</h4>
                        <ul>
                            <li>Percent Male: {(this.state.genderInfo.male * 100).toFixed(2)}%</li>
                            <li>Percent Female: {(this.state.genderInfo.female * 100).toFixed(2)}%</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Race Demographics</h4>
                        <ul>
                            <li>Percent White: {(this.state.raceInfo.white * 100).toFixed(2)}%</li>
                            <li>Percent Asian: {(this.state.raceInfo.asian * 100).toFixed(2)}%</li>
                            <li>Percent Black: {(this.state.raceInfo.black * 100).toFixed(2)}%</li>
                            <li>Percent Hispanic: {(this.state.raceInfo.hispanic * 100).toFixed(2)}%</li>
                            <li>Percent Mixed: {(this.state.raceInfo.two_or_more * 100).toFixed(2)}%</li>
                            <li>Percent Unknown: {(this.state.raceInfo.unknown * 100).toFixed(2)}%</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3>Financial Information</h3>
                    <ul>
                        <li>In-state tuition: ${this.state.financialInfo.inStateTuition}</li>
                        <li>Out-of-state tuition: ${this.state.financialInfo.outOfStateTuition}</li>
                        <li>Private average net price: ${this.state.financialInfo.privateAverageNetPrice}</li>
                        {this.state.financialInfo.publicAverageNetPrice
                        && <li>Public average net price: ${this.state.financialInfo.publicAverageNetPrice}</li>}
                        <li>Median debt: ${this.state.financialInfo.medianDebt}</li>
                        <li>Percentage of Pell Grant recipients: {this.state.financialInfo.percentagePellGrant}%</li>
                    </ul>
                </div>

                <div>
                    <h3>Academic Information</h3>
                    <ul>
                        <li>4-year graduation rate: {this.state.completionInfo['4YearGraduationRate']}</li>
                    </ul>
                </div>

                <CollegeReviewList collegeId={this.state.collegeId}/>
            </div>
        )
    }
}