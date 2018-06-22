import React from 'react';
import ReviewService from "../services/ReviewService";

/**
 * An individual item in the a college review list.
 */
export default class CollegeReviewListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            review: {
                title: '',
                user: {},
                body: '',
            }
        }
        this.reviewService = ReviewService.instance;
        this.deleteReview = this.deleteReview.bind(this);
    }

    /**
     * Deletes the review of the given id.
     * @param reviewId the id of the review
     */
    deleteReview(reviewId) {
        this.reviewService.deleteReview(reviewId).then(() => {
            if (this.props.reloadReviews) {
                this.props.reloadReviews();
            }
        })
    }


    componentDidMount() {
        console.log(this.props.review);
        this.setState({
            collegeId: this.props.collegeId,
            review: this.props.review
        })
    }

    render() {
        return (<li className="list-group-item">
            <button className="float-right btn btn-danger"
                    onClick={() => this.deleteReview(this.state.review.id)}>Delete</button>
            <div className="review-title">{this.state.review.title}</div>
            <div>by {this.state.review.user.username ? this.state.review.user.username : 'undefined'}</div>
            <div>{this.state.review.body}</div>
        </li>)
    }
}