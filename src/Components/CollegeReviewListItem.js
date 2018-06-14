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
            review: {}
        }
        this.reviewService = ReviewService.instance;
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
            <div>{this.state.review.body}</div>
        </li>)
    }
}