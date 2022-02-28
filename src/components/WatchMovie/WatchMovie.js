import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../API/configApi';
import { movieDetails } from '../../API/MoviesApi';
import PlayMovieMore from '../PlayMovieMore/PlayMovieMore';
import VoteAverage from '../VoteAverage/VoteAverage';
import './WatchMovie.css';

const WatchMovie = () => {

    const params = useParams()
    const [dataFilm, setDataFim] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await movieDetails(params.category, params.id)
            setDataFim(data)
            document.title = data.title || data.original_title || data.name
            window.scrollTo(0, 0)
        }
        fetchData()
    }, [params.category, params.id])
    return (
        <>
        {dataFilm && <div className="watch-movie" style={{
            backgroundImage: `url(${apiConfig.originalImage(dataFilm.backdrop_path)})`
        }}>
            <div className="watch-movie__containers">
                <div className="watch-movie__content">
                    <div className="watch-movie__video">
                        <iframe
                            src={((params.category === 'movie' && apiConfig.embedMovie(params.id)) || 
                            (params.category === 'tv' && apiConfig.embedEpisode(params.id, params.season, params.esp)))}
                            width="100%"
                            title="Movie player"
                            frameBorder="0"
                            allowFullScreen
                        />
                        <h2 className="watch-content__title">{dataFilm.title || dataFilm.name}</h2>
                        {params.season && <p className="watch-content__desc">Season {params.season} episode {params.esp}</p>}
                        <p className="watch-content__desc">{(dataFilm.seasons && dataFilm.seasons[params.season]?.overview) || dataFilm.overview}</p>
                        <div className="detail-content__genres watch-content__desc">
                            {dataFilm.genres !== undefined && dataFilm.genres.map((items, id) => <span key={id}>{items.name}</span>)}
                        </div>
                        <p className="watch-content__desc"><VoteAverage dataDetails={dataFilm} /></p>
                        
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