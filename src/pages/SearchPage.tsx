import React, { useCallback, useEffect, useState } from "react";
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

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadSearchResults = useCallback(
    (resource = "people") => {
      setLoading(true);
      SearchService.fetchSearchResults(resource, searchTerm)
        .then((data) => {
          console.log("data: ", data);
          setSearchResults(data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [searchTerm]
  );

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      loadSearchResults();
    } else {
      loadSearchResults();
    }
  }, [setSearchTerm]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    loadSearchResults();
  };

  const throwTestError = () => {
    loadSearchResults("asdf");
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleEnter}
        />
        <button onClick={handleSearch} disabled={loading}>
          Search
        </button>
        <button onClick={throwTestError}>Throw Error</button>
      </div>
      {loading ? (
        <div className="">Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : !searchResults?.length ? (
        <div>No results. Please try different name</div>
      ) : (
        <ul>
          {searchResults.map((person: Person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
