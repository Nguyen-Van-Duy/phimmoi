import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiConfig, { error, success } from '../../../API/configApi';
import { movieDetails, movieShareDetails } from '../../../API/MoviesApi';
import MovieItem from '../../MovieList/MovieItem';
import './Favourite.css'

function Favourite() {
    const [movie, setMovie] = useState([])
    const [listMovie, setListMovie] = useState([])
    const dataUser = useSelector((state) => state.loginSlice.dataUser);

    useEffect(() => {
        const fetchMovieFavourite = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/my-favourite/" + dataUser._id)
            console.log(data.data);
            if(data.data.length > 0) {
                setListMovie(data.data)
                getListFavourite(data.data)
            } else {
                setMovie(data.data)
            }
        }
        if(dataUser._id) {
            fetchMovieFavourite()
        }
    }, [dataUser._id])

    const getListFavourite = async (data) => {
        let listFavourite = []
        data.map(async (item)=> {
            if(Number(item.movie_id)) {
                const result = await movieDetails(item.category, Number(item.movie_id))
                await listFavourite.push({...result, category: item.category, _id: item._id})
                console.log(listFavourite);
            } else {
                const result = await movieShareDetails(item.movie_id)
                console.log(result);
                await listFavourite.push(result[0])
            }
            setMovie([...listFavourite])
        })
    }

    const handleRemove = async (favouriteId) => {
        if(dataUser && dataUser._id) {
            const result = await axios.delete(apiConfig.urlConnect + 'movie/delete-favourite/' + favouriteId)
            console.log(result);
            if(result.status === 200) {
                const newListMovie = movie.filter(item=> item._id !== favouriteId)
                setMovie(newListMovie)
                success("Delete successfully!")
            } else {
                error("404!")
            }
        } else {
            error("You need to be logged in to perform this function!")
        }
    }

    console.log(listMovie, movie);
    return (
        <div className="movie-favourite__container">
            {movie && movie.length > 0 && movie.map((item, index) => <div className="view-more__item movie-favourite__item" key={index} >
                <MovieItem item={item} category={item.category || item.media_type}  userId={dataUser._id} handleRemove={()=>handleRemove(item._id)} />
            </div>)}
        </div>
    );
};

export default Favourite