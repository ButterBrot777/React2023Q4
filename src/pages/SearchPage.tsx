import React, { useCallback, useEffect, useState } from "react";
import { ApiService } from "../api/ApiService.ts";

interface Product {
  brand: "";
  category: "";
  description: "";
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const loadSearchResults = useCallback(() => {
    setLoading(true);
    ApiService.getItems(itemsPerPage, searchTerm)
      .then((data) => {
        console.log("data: ", data);
        setSearchResults(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [searchTerm]);

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
          {searchResults.map((product: Product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
