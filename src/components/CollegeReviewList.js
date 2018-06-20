import React from 'react';
import CollegeReviewListItem from './CollegeReviewListItem';
import ReviewService from '../services/ReviewService';
import './CollegeReviewList.css';
/**
 * Component for college reviews.
 */
export default class CollegeReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            reviews: []
        }
        this.reviewService = ReviewService.instance;
    }

    componentDidMount() {
        if (this.props.collegeId) {
            this.reviewService.findReviewsForCollege(this.props.collegeId).then(reviews => {
                console.log(reviews);
                this.setState({
                    collegeId: this.props.collegeId,
                    reviews: reviews
                });
            });
        }
    }

    componentWillReceiveProps(newProps) {
        this.reviewService.findReviewsForCollege(newProps.collegeId).then(reviews => {
            this.setState({
                collegeId: newProps.collegeId,
                reviews: reviews
            });
        });
    }

    render() {
        return (<div className="list-group college-reviews">
            <h3 className="list-group-item active">Reviews</h3>
                {this.state.reviews.map((review, idx) => {
                    return <CollegeReviewListItem collegeId={this.props.collegeId} review={review} key={idx}/>
                })}
        </div>)
    }
}