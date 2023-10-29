import React, { Component } from "react";
import { SearchService } from "../api/StarWarsService.ts";

interface Person {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface SearchPageState {
  searchTerm: string;
  searchResults: Person[];
  loading: boolean;
  error: Error | null;
}

type SearchPageProps = object;

class SearchPage extends Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    // Load previous search term from local storage
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, this.loadSearchResults);
    } else {
      this.loadSearchResults();
    }
  }

  loadSearchResults = async (resource = "people") => {
    this.setState({ loading: true });

    try {
      const searchResults = await SearchService.fetchSearchResults(
        resource,
        this.state.searchTerm
      );
      this.setState({ searchResults });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") this.handleSearch();
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    this.loadSearchResults();
  };

  throwTestError = () => {
    this.loadSearchResults("asdf");
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchInputChange}
            onKeyDown={this.handleEnter}
          />
          <button onClick={this.handleSearch} disabled={this.state.loading}>
            Search
          </button>
          <button onClick={this.throwTestError}>Throw Error</button>
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
