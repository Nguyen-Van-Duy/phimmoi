import React from 'react';
import { useSelector } from 'react-redux';
import { category } from '../../API/MoviesApi';
import Banner from '../../components/Banner/Banner';
import MovieContent from '../../components/MovieContent/MovieContent';
import MovieList from '../../components/MovieList/MovieList';
import "./Home.css";


const Home = () => {
    const movie_upcoming = useSelector(state => state.datafilm.dataMovie.movie_upcoming)
    const movie_top_rated = useSelector(state => state.datafilm.dataMovie.movie_top_rated)
    const movie_popular = useSelector(state => state.datafilm.dataMovie.movie_popular)
    const movie_trending = useSelector(state => state.datafilm.dataMovie.movie_trending)

    const tv_top_rated = useSelector(state => state.datafilm.dataTv.tv_top_rated)
    const tv_popular = useSelector(state => state.datafilm.dataTv.tv_popular)
    const tv_trending = useSelector(state => state.datafilm.dataTv.tv_trending)
    const tv_on_the_air = useSelector(state => state.datafilm.dataTv.tv_on_the_air)

    return (
        <div>
            <Banner />
            <div className="content-list">
                {/* show movies */}
                <MovieContent dataFilm={movie_upcoming} titleFilm="Movies" category={category.movie} />
                <MovieList dataFilm={movie_top_rated} titleFilm="Movie Top Rated" category={category.movie} />
                <MovieList dataFilm={movie_popular} titleFilm="Movie Popular" category={category.movie} />
                <MovieList dataFilm={movie_trending} titleFilm="Movie Trending" category={category.movie} />

                {/* show tv    */}
                <MovieContent dataFilm={tv_on_the_air} titleFilm="TV Shows" category={category.tv} />
                <MovieList dataFilm={tv_top_rated} titleFilm="TV Top Rated" category={category.tv} />
                <MovieList dataFilm={tv_popular} titleFilm="TV Popular" category={category.tv} />
                <MovieList dataFilm={tv_trending} titleFilm="TV Trending" category={category.tv} />
            </div>
        </div>
    );
};

export default Home;