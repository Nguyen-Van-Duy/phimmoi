import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../API/configApi';
import { movieDetails, movieShareDetails } from '../../API/MoviesApi';
import PlayMovieMore from '../PlayMovieMore/PlayMovieMore';
import VoteAverage from '../VoteAverage/VoteAverage';
import './WatchMovie.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const WatchMovie = () => {

    const params = useParams()
    const [dataFilm, setDataFim] = useState({})
    const [favourite, setFavourite] = useState()
    const dataUser = useSelector((state) => state.loginSlice.dataUser);

    useEffect(() => {
        const fetchData = async () => {
            if(Number(params.id)) {
                const data = await movieDetails(params.category, params.id)
                setDataFim(data)
                document.title = data.title || data.original_title || data.name
            } else {
                const data = await movieShareDetails(params.id)
                console.log(data);
                setDataFim(data[0])
                document.title = `${data[0].title || data[0].name}`;
            }
            window.scrollTo(0, 0)
        }
        fetchData()
    }, [params.category, params.id])

    useEffect(()=> {
        const addMovieHistory = async () => {
            const dataRequest = {
                user_id: dataUser._id,
                movie_id: Number(params.id) ? dataFilm.id : dataFilm._id,
                category: params.category,
                genres: dataFilm.genres,
            }

            console.log(dataRequest);
            await axios.post(apiConfig.urlConnect + 'movie/add-movie-history/', dataRequest)
            console.log("favourite:", dataRequest);
        }
        if((dataFilm.id || dataFilm?._id) && dataFilm.genres && dataUser?._id) {
            addMovieHistory()
        }
    }, [dataFilm, params.category, dataUser?._id, params.id])

    useEffect(()=> {
        const getFavourite = async () => {
            const data = await axios.get(apiConfig.urlConnect + 'movie/favourite/' + dataUser._id + '/' + dataFilm.id)
            console.log("favourite:", data.data);
            setFavourite(data.data[0])
        }
        const getFavouriteMyMovie = async () => {
            const data = await axios.get(apiConfig.urlConnect + 'movie/favourite/' + dataUser._id + '/' + (dataFilm._id))
            console.log("favourite:", data.data);
            setFavourite(data.data[0])
        }
        if(dataUser && dataFilm._id) {
            getFavouriteMyMovie()
        }
        if(dataUser && dataFilm.id) {
            getFavourite()
        }
    }, [dataUser, dataUser?._id, dataFilm.id, dataFilm._id])
    
    const handleAddFavourite = async () => {
        if(dataUser && dataUser._id) {
            const result = await axios.post(apiConfig.urlConnect + 'movie/add-favourite', {
                user_id: dataUser._id,
                movie_id: dataFilm.id,
                category: params.category
            })
            setFavourite(result.data)
        } else {
            alert("You need to be logged in to perform this function!")
        }
    }

    const handleRemoveFavourite = async () => {
        if(dataUser && dataUser._id) {
            const result = await axios.delete(apiConfig.urlConnect + 'movie/delete-favourite/' + favourite._id)
            console.log(result);
            setFavourite(null)
        } else {
            alert("You need to be logged in to perform this function!")
        }
    }

    return (
        <>
        {dataFilm && <div className="watch-movie" style={Number(params.id) ? {
            backgroundImage: `url(${apiConfig.originalImage(dataFilm.backdrop_path)})`
        } : { backgroundImage: `url(${apiConfig.urlConnectSocketIO + dataFilm.backdrop_path})` }}>
            <div className="watch-movie__containers">
                <div className="watch-movie__content">
                    <div className="watch-movie__video">
                        {dataFilm.url_type === 'iframe' ? dataFilm.url : <iframe
                            src={Number(params.id) ? ((params.category === 'movie' && apiConfig.embedMovie(params.id)) || 
                            (params.category === 'tv' && apiConfig.embedEpisode(params.id, params.season, params.esp))) : 
                            dataFilm.url}
                            width="100%"
                            title="Movie player"
                            frameBorder="0"
                            allowFullScreen
                        />}
                        <h2 className="watch-content__title">{dataFilm.title || dataFilm.name}</h2>
                        {params.season && <p className="watch-content__desc">Season {params.season} episode {params.esp}</p>}
                        <p className="watch-content__desc">{(dataFilm.seasons && dataFilm.seasons[params.season]?.overview) || dataFilm.overview}</p>
                        <div className="detail-content__genres watch-content__desc">
                            {dataFilm.genres !== undefined && dataFilm.genres.map((items, id) => <span key={id}>{items.key || items.name}</span>)}
                        </div>
                        <p className="watch-content__desc">
                            <VoteAverage dataDetails={dataFilm} />
                        </p>
                        <p className="watch-content__desc">
                        {!favourite && <span className='favourite' onClick={handleAddFavourite}>Favourite:<i className="fa-solid fa-heart "></i></span>}
                            {favourite && favourite.movie_id === (dataFilm._id || dataFilm.id.toString()) && 
                            <span className='favourite favourite-add' onClick={handleRemoveFavourite}>Favourite:<i className="fa-solid fa-heart"></i></span>}
                        </p>
                        
                    </div>
                    <div className="watch-movie__trending">
                        <PlayMovieMore dataFilm={dataFilm} />
                    </div>
                    
                </div>
            </div>

        </div>}
        </>
    );
};

export default WatchMovie;