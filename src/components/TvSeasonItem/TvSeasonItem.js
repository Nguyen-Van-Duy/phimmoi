import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiConfig from '../../API/configApi';
import { movieSeasons } from '../../API/MoviesApi';
import './TvSeasonItem.css';

const TvSeasonItem = ({item, category}) => {

    const params = useParams()
    const navigate = useNavigate()
    const [listEsp, setListEsp] = useState([])
    const [showEpisode, setShowEpisode] = useState(true)

    const handleWatchEpisode = (episode) => {
        if(episode.toString() === params.esp) {
            return
        } else {
            setShowEpisode(false)
            window.scrollTo(0, 0)
            navigate(`/tv/${params.id}/watch/season/${params.season}/esp/${episode}`)
        }
    }

    useEffect(() => {
        const fetchDataEspOfSeason = async () => {
            const data = await movieSeasons(params.id, params.season)
            setListEsp(data.episodes)
        }
        fetchDataEspOfSeason()
    }, [params.id, params.season])

    const handleShowEpisode = (season) => {
        if(season.toString() === params.season) {
            setShowEpisode(!showEpisode)
        } else {
            setShowEpisode(false)
            navigate(`/tv/${params.id}/watch/season/${season}/esp/${params.esp}`)
        }
    }

    return (
        <>
            <li className={`watch-movie__item ${params.season === item.season_number?.toString() && 'season-active'}`} 
            onClick={() => handleShowEpisode(item.season_number)}>
                <img className={`watch-movie__image ${category === 'tv' && 'image-tv'}`}
                src={item.backdrop_path || item.poster_path ? apiConfig.w300Image(item.backdrop_path || item.poster_path) : apiConfig.backupPhoto} 
                alt="backdrop" />
                <div className="watch-movie__info">
                    <p className="watch-movie__name">{item.title || item.name}</p>
                </div>
            </li>
            <ul className={`movie-list__episode ${showEpisode && 'show-episode'}`}>
                {listEsp.map((data, id) => {
                    if(item.season_number !== data.season_number) {
                        return ''
                    }
                    return <li key={id} onClick={() => handleWatchEpisode(data.episode_number)}
                    className={`watch-movie__item ${params.esp === data.episode_number?.toString() && 'season-active'}`}>
                        <img className={`watch-movie__image`}
                        src={data.still_path || data.poster_path ? apiConfig.w300Image(data.still_path || data.poster_path) : apiConfig.background} 
                        alt="backdrop" />
                        <div className="watch-movie__info">
                            <p className="watch-movie__name">{data.episode_number}. {data.title || data.name}</p>
                        </div>
                    </li>
                    
                })}
            </ul>
        </>
    );
};

export default TvSeasonItem;