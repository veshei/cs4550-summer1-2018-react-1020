import React from 'react';
import ReviewService from "../services/ReviewService";
import UserService from '../services/UserService';

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
            },
            canUserDelete: false // false by default
        }
        this.reviewService = ReviewService.instance;
        this.userService = UserService.instance;
        this.deleteReview = this.deleteReview.bind(this);
        this.canUserDelete = this.canUserDelete.bind(this);
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

    /**
     * Determines whether or not the currently logged in user, if it exists, can delete this question.
     */
    canUserDelete() {
        this.userService.getProfile().then(user => {
            if (!user) {
                this.setState({canUserDelete: false});
            } else if (user.id === this.state.review.user.id || user.role === 'ADMIN') {
                this.setState({canUserDelete: true});
            } else {
                this.setState({canUserDelete: false});
            }
        });
    }


    componentDidMount() {
        console.log(this.props.review);
        this.setState({
            collegeId: this.props.collegeId,
            review: this.props.review
        })
        this.canUserDelete();
    }

    render() {
        return (<li className="list-group-item">
            {this.state.canUserDelete && <button className="float-right btn btn-danger"
                    onClick={() => this.deleteReview(this.state.review.id)}>Delete</button>}
            <div className="review-title">{this.state.review.title}</div>
            <div>by {this.state.review.user.username ? this.state.review.user.username : 'undefined'}</div>
            <div>{this.state.review.body}</div>
        </li>)
    }
}