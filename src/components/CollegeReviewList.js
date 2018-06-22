import React from 'react';
import CollegeReviewListItem from './CollegeReviewListItem';
import ReviewService from '../services/ReviewService';
import './CollegeReviewList.css';
import WriteReview from './WriteReview';
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
        this.reloadReviews = this.reloadReviews.bind(this);
    }

    /**
     * Retrieves all reviews for the college of this component's college id and sets it to this state's reviews.
     */
    reloadReviews() {
       this.reviewService.findReviewsForCollege(this.props.collegeId).then(reviews => {
           this.setState({reviews: reviews});
       });
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
            <WriteReview collegeId={this.props.collegeId}
                        reloadReviews={this.reloadReviews}/>
            <h5 className="list-group-item active">Reviews</h5>
                {this.state.reviews.map((review, idx) => {
                    return <CollegeReviewListItem collegeId={this.props.collegeId}
                                                  review={review}
                                                  reloadReviews={this.reloadReviews}
                                                  key={idx}/>
                })}
        </div>)
    }
}