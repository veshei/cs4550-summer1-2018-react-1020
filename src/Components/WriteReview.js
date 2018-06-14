import React from 'react';
import ReviewService from "../services/ReviewService";
import UserService from '../services/UserService';

export default class WriteReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeId: '',
            reviewTitle: '',
            reviewBody: ''
        }
        this.reviewService = ReviewService.instance;
        this.userService = UserService.instance;
        this.submitReview = this.submitReview.bind(this);
        this.formUpdate = this.formUpdate.bind(this);
    }

    /**
     * Creates a review with the author as the currently logged in user.
     * @param title the review title
     * @param body the review body
     */
    submitReview(title, body) {
        // Ensure the user is logged in before attempting to create the review
        this.userService.getProfile().then(user => {
            if (user) {
                let review = {
                    title: title,
                    body: body,
                    collegeId: this.state.collegeId,
                }
                this.reviewService.createReview(review).then(review => {
                    console.log(review);
                });
            }
        });
    }

    /**
     * Changes the state's form key-value pair(s) to the given one(s).
     * @param newFormUpdate the new form update
     */
    formUpdate(newFormUpdate) {
        this.setState(newFormUpdate);
    }

    componentDidMount() {
        this.setState({
            collegeId: this.props.collegeId
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            collegeId: newProps.collegeId
        })
    }

    render() {
        return (
            <div>
                <h3>Writing review for {this.state.collegeId}</h3>
                <input type="text"
                       placeholder="Title"
                       onChange={(event) => this.formUpdate({reviewTitle: event.target.value})}/>
                <input type="text"
                       placeholder="Write your review of the college here..."
                       onChange={(event) => {
                           console.log(event.target.value);
                           this.formUpdate({
                           reviewBody: event.target.value})}}/>
                <button type="button" onClick={() => {
                    this.submitReview(this.state.reviewTitle, this.state.reviewBody)
                }}>
                    Create Review
                </button>
            </div>
        );
    }
}