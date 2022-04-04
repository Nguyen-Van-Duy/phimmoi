import apiConfig from "./configApi";
import axios from "axios";

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = [
  {
    category: 'popular', name: 'Movie Popular'
  },
  {
    category: 'top_rated', name: 'Movie Top Rated'
  },
  {
    category: 'day', name: 'Movie Trending Day'
  },
  {
    category: 'week', name: 'Movie Trending Week'
  },
  {
    category: 'upcoming', name: 'Movie Upcoming'
  },
  {
    category: 'now_playing', name: 'Movie Now Playing'
  },
]

export const tvType = [
  {
    category: 'popular', name: 'TV Popular'
  },
  {
    category: 'top_rated', name: 'TV Top Rated'
  },
  {
    category: 'day', name: 'TV Trending Day'
  },
  {
    category: 'week', name: 'TV Trending Week'
  },
  {
    category: 'upcoming', name: 'TV Upcoming'
  },
  {
    category: 'now_playing', name: 'TV Now Playing'
  },
  {
    category: 'on_the_air', name: 'TV On The Air'
  },
]

export const dataMovie = async (type, category, page = 1) => {
  const url = `${apiConfig.baseUrl}/${type}/${category}?api_key=${apiConfig.apiKey}&page=${page}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const trending = async (type, time, page = 1) => {
  const url = `${apiConfig.baseUrl}/trending/${type}/${time}?api_key=${apiConfig.apiKey}&page=${page}`;
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

export const dataSearch = async (keyword, page = 1) => {
  const url = `${apiConfig.baseUrl}/search/multi?api_key=${apiConfig.apiKey}&query=${keyword}&page=${page}`;
  const response = await axios.get(url);
  return response.data;
};

export const movieSeasons = async (id, season) => {
  const url = `${apiConfig.baseUrl}/tv/${id}/season/${season}?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};
// https://api.themoviedb.org/3/genre/tv/list?api_key=04180240cb03c5637ab753d363c07d7b
export const genreMovies = async (type) => {
  const url = `${apiConfig.baseUrl}/genre/${type}/list?api_key=${apiConfig.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};
// https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&with_genres=10759

export const viewGenreMovies = async (category, id) => {
  const url = `${apiConfig.baseUrl}/discover/${category}?api_key=${apiConfig.apiKey}&with_genres=${id}`;
  const response = await axios.get(url);
  return response.data;
};

