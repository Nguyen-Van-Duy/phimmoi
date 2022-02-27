import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { category } from '../../API/MoviesApi';
import Banner from '../Banner/Banner';
import MovieContent from '../MovieContent/MovieContent';
import MovieList from '../MovieList/MovieList';

const ListFilm = () => {
    const movie_upcoming = useSelector(state => state.datafilm.dataMovie.movie_upcoming)
    const movie_top_rated = useSelector(state => state.datafilm.dataMovie.movie_top_rated)
    const movie_popular = useSelector(state => state.datafilm.dataMovie.movie_popular)
    const movie_trending = useSelector(state => state.datafilm.dataMovie.movie_trending)
    const movie_trending_day = useSelector(state => state.datafilm.dataMovie.movie_trending_day)

    const tv_top_rated = useSelector(state => state.datafilm.dataTv.tv_top_rated)
    const tv_popular = useSelector(state => state.datafilm.dataTv.tv_popular)
    const tv_trending = useSelector(state => state.datafilm.dataTv.tv_trending)
    const tv_trending_day = useSelector(state => state.datafilm.dataTv.tv_trending_day)
    const tv_on_the_air = useSelector(state => state.datafilm.dataTv.tv_on_the_air)

    const params = useParams()

    useEffect(() => {
        document.title = "DUY FILM";
        window.scrollTo(0, 0)
    }, [params.category])

    return (
        <div>
            <Banner category={params.category} />
            <div className="content-list">
                {/* show movies */}
                {params.category === "movie" && <div>
                    <MovieContent dataFilm={movie_upcoming} titleFilm="Movies" category={category.movie} />
                    <MovieList type="day" dataFilm={movie_trending_day} titleFilm="Movie Trending Day" category={category.movie} />
                    <MovieList dataFilm={movie_trending} titleFilm="Movie Trending" category={category.movie} />
                    <MovieList dataFilm={movie_top_rated} titleFilm="Movie Top Rated" category={category.movie} />
                    <MovieList dataFilm={movie_popular} titleFilm="Movie Popular" category={category.movie} />
                </div>}

                {/* show tv  */}
                {params.category === "tv" && <div>
                    <MovieContent dataFilm={tv_on_the_air} titleFilm="TV Shows" category={category.tv} />
                    <MovieList type="day" dataFilm={tv_trending_day} titleFilm="TV Trending Day" category={category.tv} />
                    <MovieList dataFilm={tv_trending} titleFilm="TV Trending" category={category.tv} />
                    <MovieList dataFilm={tv_top_rated} titleFilm="TV Top Rated" category={category.tv} />
                    <MovieList dataFilm={tv_popular} titleFilm="TV Popular" category={category.tv} />
                    <MovieList dataFilm={tv_on_the_air} titleFilm="TV On The Air" category={category.tv} />
                </div>}
            </div>
        </div>
    );
};

export default ListFilm;