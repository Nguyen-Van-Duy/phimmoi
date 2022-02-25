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

export const movieDetails = async (category, id) => {
  const url = `${apiConfig.baseUrl}/${category}/${id}?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const cast = async (category, id) => {
  const url = `${apiConfig.baseUrl}/${category}/${id}/credits?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const listTrailer = async (category, id) => {
  const url = `${apiConfig.baseUrl}/${category}/${id}/videos?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

export const similar = async (category, id) => {
  const url = `${apiConfig.baseUrl}/${category}/${id}/similar?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const infoCast = async (id) => {
  const url = `${apiConfig.baseUrl}/person/${id}?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};

