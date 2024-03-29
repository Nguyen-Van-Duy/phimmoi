import apiConfig from "./configApi";
import axios from "axios";

export const category = {
  movie: 'movie',
  tv: 'tv',
};

// Vietnam, Korea, Japan, China, Thailand, Taiwan, Canada, India, Hong Kong, UK, France, USA, Australia, Other Country
export const countries = [
  {
    key: 'Select a country', value: ''
  },
  {
    key: 'Vietnam',
    value: 'Vietnam'
  },
  {
    key: 'Korea',
    value: 'Korea'
  },
  {
    key: 'Japan',
    value: 'Japan'
  },
  {
    key: 'China',
    value: 'China'
  },
  {
    key: 'Thailand',
    value: 'Thailand'
  },
  {
    key: 'Taiwan',
    value: 'Taiwan'
  },
  {
    key: 'Canada',
    value: 'Canada'
  },
  {
    key: 'India',
    value: 'India'
  },
  {
    key: 'Hong Kong',
    value: 'HongKong'
  },
  {
    key: 'UK',
    value: 'UK'
  },
  {
    key: 'France',
    value: 'France'
  },
  {
    key: 'USA',
    value: 'USA'
  },
  {
    key: 'Australia',
    value: 'Australia'
  },
  {
    key: 'Others',
    value: 'Others'
  },
]

export const genderMovie = [
  {
    value: "28",
    key: "Action"
  },
  {
    value: "12",
    key: "Adventure"
  },
  {
    value: "16",
    key: "Animation"
  },
  {
    value: "35",
    key: "Comedy"
  },
  {
    value: "80",
    key: "Crime"
  },
  {
    value: "99",
    key: "Documentary"
  },
  {
    value: "18",
    key: "Drama"
  },
  {
    value: "10751",
    key: "Family"
  },
  {
    value: "14",
    key: "Fantasy"
  },
  {
    value: "36",
    key: "History"
  },
  {
    value: "27",
    key: "Horror"
  },
  {
    value: "10402",
    key: "Music"
  },
  {
    value: "9648",
    key: "Mystery"
  },
  {
    value: "10749",
    key: "Romance"
  },
  {
    value: "878",
    key: "Science Fiction"
  },
  {
    value: "10770",
    key: "TV Movie"
  },
  {
    value: "53",
    key: "Thriller"
  },
  {
    value: "10752",
    key: "War"
  },
  {
    value: "37",
    key: "Western"
  }
]

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

export const handleSearch = async (name, value) => {
  const result = (name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').includes((value).toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')))
  console.log(result);
  return result;
};

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

export const movieShareDetails = async (movieId) => {
  const url = `${apiConfig.urlConnect}movie/movie-detail/${movieId}`;
  const response = await axios.get(url);
  return response.data;
};

export const movieFavouriteDetails = async (movieId) => {
  const url = `${apiConfig.urlConnect}movie/movie-detail-favourite/${movieId}`;
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

export const viewGenreMovies = async (category, id, page) => {
  const url = `${apiConfig.baseUrl}/discover/${category}?api_key=${apiConfig.apiKey}&with_genres=${id}&page=${page}`;
  const response = await axios.get(url);
  return response.data;
};

