import React, { useCallback, useEffect, useRef, useState } from "react";
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
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) setSearchTerm(savedSearchTerm);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const ref = useRef<HTMLInputElement | null>(null);

  const loadSearchResults = useCallback(() => {
    setLoading(true);
    ApiService.getItems(itemsPerPage, searchTerm)
      .then((data) => {
        console.log("data: ", data);
        setSearchResults(data?.data.products);
        setError(null);
      })
      .catch((error) => setError(error))
      .finally(() => {
        console.log("term: ", searchTerm);
        setLoading(false);
      });
  }, [itemsPerPage, searchTerm]);

  useEffect(() => {
    loadSearchResults();
  }, [loadSearchResults]);

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    const currentRef = ref.current?.value;
    if (currentRef) {
      const value = currentRef.trim();
      setSearchTerm(value);
      localStorage.setItem("searchTerm", value);
      loadSearchResults();
    } else {
      localStorage.setItem("searchTerm", "");
      console.log("empty");
      setSearchTerm("");
      loadSearchResults();
    }
  };

  const throwTestError = () => {
    throw new Error("Test error buuuaaaa!!!");
    setError(new Error("Test error buuuaaaa!!!"));
  };

  const handlePrev = () => {
    console.log("prev: ", itemsPerPage);
  };
  const handleNext = () => {
    console.log("next: ", itemsPerPage);
  };
  const handleItemsCountChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setItemsPerPage(value);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <input
          defaultValue={localStorage.getItem("searchTerm") ?? ""}
          onKeyDown={handleEnter}
          ref={ref}
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
      <div className="flex">
        <button type="button" onClick={handlePrev}>
          prev
        </button>
        <select
          className="flex"
          value={itemsPerPage}
          onChange={handleItemsCountChange}
        >
          <option value={"5"}>5</option>
          <option value={"10"}>10</option>
        </select>
        <button type="button" onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  );
};
