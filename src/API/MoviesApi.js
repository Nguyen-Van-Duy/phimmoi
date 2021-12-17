import apiConfig from "./configApi";
import axios from "axios";

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const dataMovie = async (type, category) => {
  const url = `${apiConfig.baseUrl}/${type}/${category}?api_key=${apiConfig.apiKey}&page=1`;
  const response = await axios.get(url);
  return response.data.results;
};

export const trending = async (type, time) => {
  const url = `${apiConfig.baseUrl}/trending/${type}/${time}?api_key=${apiConfig.apiKey}&page=1`;
  const response = await axios.get(url);
  return response.data.results;
};

