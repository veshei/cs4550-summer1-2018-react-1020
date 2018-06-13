import React from 'react';
import CollegeService from '../services/CollegeService';

export default class CollegeSearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            collegeResults: [],
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
        this.collegeService.searchCollegeByName(searchTerm).then(colleges => {
            console.log(colleges);
            this.setState({collegeResults: colleges.results});
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

                <ul>
                    {this.state.collegeResults.map(college => {
                        console.log(college.school.name);
                        return <li><a href={"/college/" + college.id}>{college.school.name}</a></li>
                    })}
                </ul>
            </div>
        )
    }
}