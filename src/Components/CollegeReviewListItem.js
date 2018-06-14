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
            console.log('review deleted');
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
        return (<li>
            <div>{this.state.review.title}</div>
            <div>{this.state.review.user.username}</div>
            <div>{this.state.review.body}</div>
            <button onClick={() => this.deleteReview(this.state.review.id)}>Delete</button>
        </li>)
    }
}