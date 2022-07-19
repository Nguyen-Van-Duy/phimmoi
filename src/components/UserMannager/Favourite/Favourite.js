import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiConfig from '../../../API/configApi';
import { movieDetails } from '../../../API/MoviesApi';
import MovieItem from '../../MovieList/MovieItem';
import './Favourite.css'

function Favourite() {
    const [movie, setMovie] = useState([])
    const [listMovie, setListMovie] = useState([])
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    console.log(dataUser);
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
        fetchMovieFavourite()
    }, [dataUser._id])

    const getListFavourite = async (data) => {
        console.log(data);
        let listFavourite = []
        data.map(async (item)=> {
            if(Number(item.movie_id)) {
                const result = await movieDetails(item.category, Number(item.movie_id))
                console.log("result:", result);
                await listFavourite.push(result)
                console.log(listFavourite);
            } else {
            }
            setMovie([...listFavourite])
        })
        console.log("listFavourite:", listFavourite);
    }

    const handleRemoveFavourite = async (favouriteId) => {
        if(dataUser && dataUser._id) {
            const result = await axios.delete(apiConfig.urlConnect + 'movie/delete-favourite/' + favouriteId)
            console.log(result);
            if(result.status === 200) {
                const newListMovie = listMovie.filter(item=> item._id !== favouriteId)
                getListFavourite(newListMovie)
            } else {
                alert("404!")
            }
        } else {
            alert("You need to be logged in to perform this function!")
        }
    }

    console.log(listMovie);
    return (
        <div className="movie-favourite__container">
            {movie && movie.length > 0 && movie.map((item, index) => <div className="view-more__item movie-favourite__item" key={index} >
                <MovieItem item={item} category={listMovie[index].category}  userId={dataUser._id} handleRemoveFavourite={()=>handleRemoveFavourite(listMovie[index]._id)} />
            </div>)}
        </div>
    );
};

export default Favourite