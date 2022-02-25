import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../API/configApi';
import { cast, movieDetails } from '../../API/MoviesApi';
import './MovieDetails.css';
import Modal from '../../components/Modal/Modal';
import Trailer from '../../components/Trailer/Trailer';
import Paticipants from '../../components/Paticipants/Paticipants';
import Similar from '../../components/Similar/Similar';
import ProfileCast from '../../components/ProfileCast/ProfileCast';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowProfileCast } from '../../store/profileCastSlice';

const MovieDetails = () => {
    const [dataDetails, setDAtaDetails] = useState({})
    const [listCast, setListCast] = useState([])
    const [listCrew, setListCrew] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const showProfileCast = useSelector( state => state.profileCast.isShowProfile)
    const params = useParams()
    const dispatch = useDispatch()
    console.log(showProfileCast)
    console.log(dataDetails, listCrew)

    const toggleShowProfile = () => {
        dispatch(handleShowProfileCast.handleShowProfile())
    }

    const directors = listCrew.filter((item) => item.job === "Director")

    const voteAverage = []
    if(Number.isInteger(dataDetails.vote_average)) {
        for(let i = 1; i <= dataDetails.vote_average; i++) {
            voteAverage.push('fa-solid fa-star')
        }
        for(let i = 1; i <= 10 - dataDetails.vote_average; i++) {
            voteAverage.push('fa-regular fa-star')
        }
    } else {
        for(let i = 1; i <= Math.floor(dataDetails.vote_average); i++) {
            voteAverage.push('fa-solid fa-star')
        }
        voteAverage.push('fa-solid fa-star-half-stroke')
        for(let i = 1; i <= 10 - Math.ceil(dataDetails.vote_average); i++) {
            voteAverage.push('fa-regular fa-star')
        }
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        
        const fetchDataFilm = async () => {
            // fetch dataFilm
            const data = await movieDetails(params.category, params.id)
            setDAtaDetails(data)
            // fetch data cast and crew
            const dataCast = await cast(params.category, params.id)
            setListCast(dataCast.cast)
            setListCrew(dataCast.crew)
            setIsLoading(false)
            document.title = `${data.title || data.name}`;
            window.scrollTo(0, 0)
        }
        fetchDataFilm()
    }, [params.category, params.id])

    return (<>
        {/* modal show trailer */}
        <div onClick={toggleModal}><Modal showModal={showModal} /></div>
        {showModal && <Trailer closeTrailer={toggleModal} category={params.category} id={params.id}/>}
        {/* modal show profile */}
        <div onClick={toggleShowProfile}><Modal showModal={showProfileCast} /></div>
        {showProfileCast && <ProfileCast category={params.category} id={params.id}/>}

        {!isLoading && <> <section className="detail-container container" 
        style={{ backgroundImage: `url(${apiConfig.originalImage(dataDetails.backdrop_path || dataDetails.poster_path)})` }}>
            <div className="detail-container__content">
                <div className="detail__image">
                    <img src={apiConfig.w500Image(dataDetails.poster_path || dataDetails.backdrop_path)} alt={dataDetails.title || dataDetails.name} />
                </div>
                <div className="detail-container__wrap">
                    <div className="detail-content">
                        <h2 className="detail-content__title">{dataDetails.title || dataDetails.name}</h2>
                        <p className="detail-content__desc">{dataDetails.overview}</p>
                        <p className="detail-content__desc">
                            <span className="detail-content__time">Country: {dataDetails.production_countries[0]?.name || (dataDetails.origin_country && dataDetails.origin_country[0]) || 'Updateting'}</span>
                        </p>
                        {params.category === 'tv' && <p className="detail-content__desc">
                            <span className="detail-content__time">Total seasons: {dataDetails.number_of_seasons}</span>
                            Total Episode: {dataDetails.number_of_episodes}
                        </p>}
                        <p className="detail-content__desc">
                            <span className="detail-content__time">Time: {dataDetails.runtime || dataDetails.episode_run_time} minute</span>
                            Date: {dataDetails.release_date || dataDetails.first_air_date}
                        </p>
                        {directors.length > 0 && <p className="detail-content__desc">Directors: {directors.map((item) => `${item.name} `)}</p>}
                        <div className="detail-content__genres">
                            {dataDetails.genres.map((item, id) => <span key={id}>{item.name}</span>)}
                        </div>
                        <p className="detail-content__desc">
                            {voteAverage.map((vote, id) => <span key={id} className='vote-start'><i className={`${vote}`}></i></span>)}
                            ({dataDetails.vote_count} votes)
                        </p>
                        <div className="banner__button detail-content__button">
                            <span className="button red">
                                <i className="fas fa-play-circle"></i>Play Now
                            </span>
                            <span className="button green" onClick={toggleModal}>
                            <i className="fa-brands fa-youtube"></i>Trailer
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <span className="home-page container">Homepage: <a href={dataDetails.homepage} target="_blank" rel="noopener noreferrer"> {dataDetails.homepage}</a></span>
        <div className="content-list">
            {listCast.length > 0 && <Paticipants paticipants={listCast}/>}
            <Similar />
        </div>
        </>
        }

        </>
    );
};

export default MovieDetails;