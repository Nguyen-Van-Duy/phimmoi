import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { dataMovie, trending } from "./API/MoviesApi";
import { useDispatch } from "react-redux";
import { dataFilmAction } from "./store/dataFilmSlice";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Loading from "./components/Loading";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Movie from "./pages/Movies/Movie";

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDataFilm = async () => {

      // call data movie
      const movie_trending = await trending("movie", "week")
      const movie_now_playing = await dataMovie("movie", "now_playing")
      const movie_upcoming = await dataMovie("movie", "upcoming")
      const movie_popular = await dataMovie("movie", "popular")
      const movie_top_rated = await dataMovie("movie", "top_rated")

      //call data tv
      const tv_trending = await trending("tv", "week")
      const tv_on_the_air = await dataMovie("tv", "on_the_air")
      const tv_popular = await dataMovie("tv", "popular")
      const tv_top_rated = await dataMovie("tv", "top_rated")

      //dispatch data movie
      dispatch(dataFilmAction.movie_trending(movie_trending))
      dispatch(dataFilmAction.movie_now_play(movie_now_playing))
      dispatch(dataFilmAction.movie_top_rated(movie_top_rated))
      dispatch(dataFilmAction.movie_upcoming(movie_upcoming))
      dispatch(dataFilmAction.movie_popular(movie_popular))

      //dispatch data tv
      dispatch(dataFilmAction.tv_trending(tv_trending))
      dispatch(dataFilmAction.tv_on_the_air(tv_on_the_air))
      dispatch(dataFilmAction.tv_popular(tv_popular))
      dispatch(dataFilmAction.tv_top_rated(tv_top_rated))

      setIsLoading(false)
    }
    fetchDataFilm()
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <main className="main">
        {!isLoading && <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movies"
            element={'movies'}
          />
          <Route
            path="/:category"
            element={<Movie />}
          />
          <Route
            path="/:category/:id"
            element={<MovieDetails />}
          />
          <Route path="/:category/:id/watch" element={"watch movie"} />
        </Routes>}
        {isLoading && <div className="loading"><Loading /></div>}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
