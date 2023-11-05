import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Product } from "../pages/SearchPage.tsx";
import React, { useEffect, useState } from "react";
import { ApiService } from "../api/ApiService.ts";

export const Item = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [customItem, setCustomItem] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      ApiService.getItem(params.id)
        .then((data) => {
          setCustomItem(data.data);
        })
        .catch((error) => console.log("Fetch error: ", error))
        .finally(() => setLoading(false));
    }
  }, [params.id]);
  console.log("params: ", ...searchParams);
  return (
    <>
      {loading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="flex flex-col">
          <Link to={"/"}>Close</Link>
          <p>ID: {customItem?.id}</p>
        </div>
      )}
    </>
  );
};
