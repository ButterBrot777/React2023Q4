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
  const [searchTerm, setSearchTerm] = useState(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    return storedSearchTerm ? storedSearchTerm : "";
  });
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef<HTMLInputElement | null>(null);

  const loadSearchResults = useCallback(() => {
    setLoading(true);
    ApiService.getItems(itemsPerPage, searchTerm, currentPage)
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
  }, [currentPage, itemsPerPage, searchTerm]);

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
    setCurrentPage((prevState) => prevState - 1);
  };
  const handleNext = () => {
    console.log("next: ", itemsPerPage);
    setCurrentPage((prevState) => prevState + 1);
  };
  const handleItemsCountChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setItemsPerPage(value);
  };

  return (
    <div className="flex flex-col">
      <div style={{ marginBottom: "16px" }}>
        <input defaultValue={searchTerm} onKeyDown={handleEnter} ref={ref} />
        <button onClick={handleSearch} disabled={loading}>
          Search
        </button>
        <button onClick={throwTestError}>Throw Error</button>
      </div>
      <div className="flex w-full gap-3 my-6 justify-center">
        <button
          className="bg-gray-500"
          type="button"
          onClick={handlePrev}
          disabled={!currentPage}
        >
          prev
        </button>
        <div className="flex items-center px-4">{currentPage + 1}</div>
        <select
          className="flex w-14"
          value={itemsPerPage}
          onChange={handleItemsCountChange}
        >
          <option value={"5"}>5</option>
          <option value={"10"}>10</option>
        </select>
        <button className="bg-gray-500" type="button" onClick={handleNext}>
          next
        </button>
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
