import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { trending } from '../../API/MoviesApi';
import MovieItemMore from '../MovieItemMore/MovieItemMore';
import TvSeasonItem from '../TvSeasonItem/TvSeasonItem';
import './PlayMovieMore.css';

const PlayMovieMore = ({dataFilm}) => {

    const [dataMovie, setDataMovie] = useState([])

    const params = useParams()
    // console.log(dataMovie, dataFilm)

    useEffect(() => {
        const fetchData = async () => {
            const data = await trending(params.category, 'day')
            // console.log(data)
            setDataMovie(data)
        }
        fetchData()
    }, [params.category])

    return (<>
        {dataMovie.length > 0 && <div className="watch-movie__container">
            <h2 className="watch-movie__title">Movie Trending</h2>
            <ul className="watch-movie__list">
                {params.category === 'movie' && dataMovie.map((item, id) => <MovieItemMore key={id} item={item} category={params.category} />)}
                {params.category === 'tv' && dataFilm && dataFilm.seasons?.length > 0 && 
                dataFilm.seasons.map((item, id) => <TvSeasonItem key={id} item={item} category={params.category} />)}
            </ul>
        </div>}
        </>
    );
};

export default PlayMovieMore;