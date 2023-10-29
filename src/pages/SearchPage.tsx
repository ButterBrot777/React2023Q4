import React, { Component } from "react";
import axios from "axios";
import StarWarsService from "../api/StarWarsService.ts";

interface Person {
  "birth_year": string;
  "eye_color": string;
  "films": string[];
  "gender": string;
  "hair_color": string;
  "height": string;
  "homeworld": string;
  "mass": string;
  "name": string;
  "skin_color": string;
  "created": string;
  "edited": string;
  "species": string[];
  "starships": string[];
  "url": string;
  "vehicles": string[];
}

class SearchPage extends Component {
  state = {
    searchTerm: "",
    searchResults: [],
    loading: false,
    error: null as Error | null,
  };

  componentDidMount() {
    // Load previous search term from local storage
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, this.loadSearchResults);
    } else {
      this.loadSearchResults();
    }
  }

  loadSearchResults = async () => {
    this.setState({ loading: true });
    console.log('state input: ', this.state.searchTerm)
    console.log('local storage input: ', localStorage.getItem('searchTerm'))

    try {
      const response = await axios.get(
          `https://swapi.dev/api/people/?search=${this.state.searchTerm}`
      );
      const resp = await StarWarsService.getPlanets(this.state.searchTerm)
      console.log("response: ", resp);
      this.setState({ searchResults: response.data.results });

    } catch (error) {
      console.error("API request failed:", error);
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleEnter = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') this.handleSearch();
  }

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    this.loadSearchResults();
  };

  throwError = () => {
    throw new Error("This is a test error");
  };

  render() {
    return (
      <div>
        <div>
          <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleSearchInputChange}
              onKeyDown={this.handleEnter}
          />
          <button onClick={this.handleSearch} disabled={this.state.loading}>Search</button>
          <button onClick={this.throwError}>Throw Error</button>
        </div>
        {this.state.loading ? (
            <div className="">Loading...</div>
        ) : this.state.error ? (
            <div>Error: {this.state.error.message}</div>
        ) : !this.state.searchResults?.length ? (
            <div>No results. Please try different name</div>
            ) : (
            <ul>
              {this.state.searchResults.map((person: Person) => (
                  <li key={person.name}>{person.name}</li>
              ))}
            </ul>
        )}
      </div>
    );
  }
}

export default SearchPage;
