import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiConfig from '../../../API/configApi';
import MovieItem from '../../MovieList/MovieItem';

const MovieWaiting = () => {
    const [movie, setMovie] = useState(null)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    useEffect(() => {
        const fetchMovieUpload = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/movie-waiting/" + dataUser._id)
            console.log(data);
            setMovie(data.data)
        }
        fetchMovieUpload()
    }, [dataUser._id])
    return (
        <div className="my-movie__container">
            {movie &&movie.length > 0 ? movie.map((item, index) => <div className="view-more__item" key={index} >
                <MovieItem item={item} category={item.media_type} />
            </div>) : <span>Not data</span>}
            
        </div>
    );
};

export default MovieWaiting;