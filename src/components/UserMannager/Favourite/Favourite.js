import { Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiConfig, { error, success } from '../../../API/configApi';
import { movieDetails, movieFavouriteDetails } from '../../../API/MoviesApi';
import Loading from '../../Loading';
import MovieItem from '../../MovieList/MovieItem';
import './Favourite.css'
import { SmileOutlined } from '@ant-design/icons';

function Favourite() {
    const [movie, setMovie] = useState([])
    const [listMovie, setListMovie] = useState([])
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMovieFavourite = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/my-favourite/" + dataUser._id)
            console.log(data.data);
            if(data.data.length > 0) {
                setListMovie(data.data)
                console.log(data.data);
                getListFavourite(data.data)
            } else {
                setMovie(data.data)
            }
            setIsLoading(false)
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
                await listFavourite.push({...result, category: item.category, favourite_id: item._id})
                console.log(listFavourite);
            } else {
                const result = await movieFavouriteDetails(item.movie_id)
                console.log(result);
                await listFavourite.push({...result[0], favourite_id: item._id})
            }
            setMovie([...listFavourite])
        })
    }

    const handleRemove = async (favouriteId) => {
        if(dataUser && dataUser._id) {
            const result = await axios.delete(apiConfig.urlConnect + 'movie/delete-favourite/' + favouriteId)
            console.log(favouriteId);
            if(result.status === 200) {
                const newListMovie = movie.filter(item=> item.favourite_id !== favouriteId)
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
        <>
        <h2 className='profile_title'>Favourite</h2>
        <div className="movie-favourite__container">
            {isLoading && <div className="manager-loading loading"><Loading /></div>}
            {!isLoading && movie && movie.length > 0 && movie.map((item, index) => <div className="view-more__item movie-favourite__item" key={index} >
                <MovieItem item={item} category={item.category || item.media_type}  userId={dataUser._id} handleRemove={()=>handleRemove(item.favourite_id)} />
            </div>)}
        </div>
        {!isLoading && movie && movie.length <= 0 && <Result
            icon={<SmileOutlined />}
            title="No Data!"
        />}
        </>
    );
};

export default Favourite