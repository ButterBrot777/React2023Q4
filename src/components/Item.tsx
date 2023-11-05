import {
  Link,
  useNavigate,
  useNavigation,
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
  const { id, q, limit, page } = searchParams;
  const navigation = useNavigation();

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

  return (
    <>
      {loading ? (
        <div className="">Loading...</div>
      ) : params.id ? (
        <div className="flex flex-col">
          <Link
            to={`/search?q=${q ? q : ""}&limit=${limit ? limit : ""}&page=${
              page ? page : ""
            }`}
          >
            Close
          </Link>
          <p>ID: {customItem?.id}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
