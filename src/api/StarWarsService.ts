import axios from "axios";

export default class StarWarsService {
  static async getPlanets(query: string) {
    const PLANETS_URL = `https://swapi.dev/api/asdf/?search=${query}`;

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: PLANETS_URL,
    };

    return axios.request(config);
  }
}
