import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiConfig, { error, success } from '../../../API/configApi';
import MovieItem from '../../MovieList/MovieItem';
import "./MyMovie.css"

const MyMovie = () => {
    const [movie, setMovie] = useState(null)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const token = localStorage.getItem('token')
    console.log(dataUser);
    useEffect(() => {
        const fetchMovieUpload = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/my-movie/" + dataUser._id)
            console.log(data);
            setMovie(data.data)
        }
        fetchMovieUpload()
    }, [dataUser._id])

    const handleRemove = async (movieId) => {
        if(dataUser && dataUser._id) {
            const result = await axios.delete(apiConfig.urlConnect + 'movie/delete-my-movie/' + movieId, apiConfig.headers)
            console.log(result);
            if(result.status === 200) {
                const newListMovie = movie.filter(item=> item._id !== movieId)
                setMovie(newListMovie)
                success("Delete successfully!")
            } else {
                error("404!")
            }
        } else {
            error("You need to be logged in to perform this function!")
        }
    }
    console.log(movie);
    return (
        <div className="my-movie__container">
            {movie && movie.map((item, index) => <div className="view-more__item" key={index} >
                <MovieItem item={item} category={item.media_type} userId={dataUser._id} handleRemove={()=> handleRemove(item._id)} myMovie={item.user_id === dataUser._id} />
            </div>)}
            
        </div>
    );
};

export default MyMovie;