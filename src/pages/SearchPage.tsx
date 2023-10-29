import React, { Component } from "react";
// import axios from "axios";

class SearchPage extends Component {
    state = {
        searchTerm: "",
        searchResults: [],
        error: null,
    };

    componentDidMount() {
        const savedSearchTerm = localStorage.getItem("searchTerm");
        if (savedSearchTerm) {
            this.setState({ searchTerm: savedSearchTerm });
        }

        this.loadSearchResults(this.state.searchTerm);
    }

    loadSearchResults = (searchTerm: string) => {
        console.log('search input: ', searchTerm)
        // Make an API call to fetch search results
        // You can use axios or any other library of your choice
        // Update the searchResults state with the response data
    };

    handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSearchClick = () => {
        // Process the search term and save it to local storage
        const trimmedSearchTerm = this.state.searchTerm.trim();
        localStorage.setItem("searchTerm", trimmedSearchTerm);
        this.loadSearchResults(trimmedSearchTerm);
    };

    render() {
        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.handleSearchInputChange}
                    />
                    <button onClick={this.handleSearchClick}>Search</button>
                </div>
                <div>
                    {/* Display search results here */}
                </div>
            </div>
        );
    }
}

export default SearchPage;
