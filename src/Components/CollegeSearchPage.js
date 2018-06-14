import React from 'react';
import CollegeService from '../services/CollegeService';
import CollegeList from './CollegeList';

export default class CollegeSearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            collegeResults: [],
            isSearching: false
        }
        this.collegeService = CollegeService.instance;
    }

    /**
     * Sets the search term to the given value.
     * @param searchTerm the search term
     */
    setSearchTerm(searchTerm) {
        this.setState({searchTerm: searchTerm});
    }

    /**
     * Searches for a college in the college API using the given search term and renders the results on this
     * component's page.
     */
    searchCollege(searchTerm) {
        this.setState({
            isSearching: true,
            collegeResults: []
        });
        this.collegeService.searchCollegeByName(searchTerm).then(colleges => {
            this.setState({
                collegeResults: colleges.results,
                isSearching: false
            });
        });
    }

    /**
     * Searches for a college
     * @return {*}
     */
    render() {
        return (
            <div>
                <label>Search for college by name: </label>
                <input type="text"
                       placeholder="Enter the name of a college..."
                       onChange={event => this.setSearchTerm(event.target.value)}/>
                <button type="button" onClick={() => this.searchCollege(this.state.searchTerm)}>Search</button>
                <div>
                    {this.state.isSearching && 'Searching for colleges...'}
                </div>
                <CollegeList collegesInfo={this.state.collegeResults}/>
            </div>
        )
    }
}