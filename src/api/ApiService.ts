import axios, { AxiosError } from "axios";
const BASE_URL = "https://dummyjson.com/products/";

export class ApiService {
  public static async getItems(limit = 10, query = "") {
    try {
      const response = await axios.get(
        `${BASE_URL}?limit=${limit}&search?q=${query}`
      );
      console.log("response: ", response);

      return response.data.products;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("API request failed:", axiosError.message);

        if (axiosError.response?.status === 404) {
          throw new Error("Bad request. Please check URL params.");
        }
      }

      throw error;
    }
  }
}
