import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css'; 
import React,{ useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { dataMovie, trending } from "./API/MoviesApi";
import { useDispatch } from "react-redux";
import { dataFilmAction } from "./store/dataFilmSlice";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Loading from "./components/Loading";
import ChatBox from "./components/ChatBox/ChatBox";
import UserMannager from "./components/UserMannager/UserMannager";
import RTC from "./pages/RTC/RTC";
import Admin from "./pages/Admin/Admin";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import axios from "axios";
import LoginAdmin from "./pages/Admin/LoginAdmin/LoginAdmin";
// import MovieDetails from "./pages/MovieDetails/MovieDetails";
// import ViewMore from "./pages/ViewMore/ViewMore";
// import ViewGenre from "./pages/ViewGenre/ViewMore";
// import ResultSearch from "./pages/ResultSearch/ResultSearch";
// import Watch from "./pages/Watch/Watch";
const NewMovie = React.lazy(()=>import("./pages/NewMovie/NewMovie"));
const MovieSchedule = React.lazy(()=>import("./pages/MovieSchedule/MovieSchedule"));
const Movie = React.lazy(()=>import("./pages/Movies/Movie"));
const MovieDetails = React.lazy(()=>import("./pages/MovieDetails/MovieDetails"));
const ViewMore = React.lazy(()=>import("./pages/ViewMore/ViewMore"));
const ViewGenre = React.lazy(()=>import("./pages/ViewGenre/ViewMore"));
const ResultSearch = React.lazy(()=>import("./pages/ResultSearch/ResultSearch"));
const Watch = React.lazy(()=>import("./pages/Watch/Watch"));

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showBoxChat, setShowBoxChat] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  // const dataUser = useSelector((state) => state.loginSlice.dataUser);

  useEffect(() => {
    const fetchDataFilm = async () => {

      // call data movie
      const movie_trending_day = await trending("movie", "day")
      const movie_now_playing = await dataMovie("movie", "now_playing")
      const tv_trending_day = await trending("tv", "day")
      
      //dispatch data movie
      dispatch(dataFilmAction.movie_trending_day(movie_trending_day))
      dispatch(dataFilmAction.movie_now_play(movie_now_playing))
      dispatch(dataFilmAction.tv_trending_day(tv_trending_day))
      
      setIsLoading(false)
    }
    fetchDataFilm()
  }, [dispatch])

  useEffect(() => {
    const fetchDataFilm = async () => {
      
      // call data movie
      // await dataMovie("movie", "upcoming")
      const movie_trending = await trending("movie", "week")
      const movie_upcoming = (await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=37f380c84b46fa72f453af5706c78a44&page=1`)).data.results
      const movie_popular = await dataMovie("movie", "popular")
      const movie_top_rated = await dataMovie("movie", "top_rated")

      //call data tv
      const tv_trending = await trending("tv", "week")
      const tv_on_the_air = await dataMovie("tv", "on_the_air")
      const tv_popular = await dataMovie("tv", "popular")
      const tv_top_rated = await dataMovie("tv", "top_rated")

      //dispatch data movie
      dispatch(dataFilmAction.movie_trending(movie_trending))
      dispatch(dataFilmAction.movie_top_rated(movie_top_rated))
      dispatch(dataFilmAction.movie_upcoming(movie_upcoming))
      dispatch(dataFilmAction.movie_popular(movie_popular))

      //dispatch data tv
      dispatch(dataFilmAction.tv_trending(tv_trending))
      dispatch(dataFilmAction.tv_on_the_air(tv_on_the_air))
      dispatch(dataFilmAction.tv_popular(tv_popular))
      dispatch(dataFilmAction.tv_top_rated(tv_top_rated))

      // setIsLoading(false)
    }
    fetchDataFilm()
  }, [dispatch])

  const handleShowBoxChat = () => {
    setShowBoxChat(!showBoxChat)
  }

//   document.onkeydown = function(event) {
//   console.log(event.key);
// }

console.log(location);

  return (
    <div className="App">
      {!location.pathname.includes("admin") && <Header />}
      {!location.pathname.includes("/login-admin") && <ChatBox showBoxChat={showBoxChat} handleShowBoxChat={handleShowBoxChat} />}
      {!location.pathname.includes("/login-admin") && 
      <div className="message-icon__show" onClick={handleShowBoxChat}><i className="fa-solid fa-comment-dots"></i></div>}
      <main className="main">
        {!isLoading && <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login-admin/*" element={<LoginAdmin />} />
          <Route
            path="/manager/*"
            element={<UserMannager />}
          />
          <Route
            path="/new-movie/*"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><NewMovie /></React.Suspense>}
          />
          <Route
            path="/movie-schedule/*"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><MovieSchedule /></React.Suspense>}
          />
          <Route
            path="/:category"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><Movie /></React.Suspense>}
          />
          <Route
            path="/RTC/:roomId/:type"
            element={<RTC />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/:category/:id"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><MovieDetails /></React.Suspense>}
          />
          <Route
            path="/:category/:type/view"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><ViewMore /></React.Suspense>}
          />
          <Route
            path="/:category/genre/:id/:name"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><ViewGenre /></React.Suspense>}
          />
          <Route
            path="/results/:keyword"
            element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><ResultSearch /></React.Suspense>}
          />
          <Route path="/:category/:id/watch" element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><Watch /></React.Suspense>} />
          <Route path="/:category/:id/watch/season/:season/esp/:esp" element={<React.Suspense fallback={<div className="loading"><Loading /></div>}><Watch /></React.Suspense>} />
          {/* <Route path='*' element={<Home />} /> */}
        </Routes>}
        {isLoading && <div className="loading"><Loading /></div>}
      </main>
      <ScrollToTop />
      {!location.pathname.includes("admin") && <Footer />}
    </div>
  );
}

export default App;
