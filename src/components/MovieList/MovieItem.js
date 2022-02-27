import React from 'react';
import './MovieItem.css';
import "./MovieList.css";
import apiConfig from '../../API/configApi';
import { Link } from 'react-router-dom';

const MovieItem = ({item, category}) => {

    const handleNotification = () =>{
        if(category === 'person') {
            alert('this is not a movie!')
        }
    }
    return (
        <div className="movie-item">
            <div className="movie-item__content">
                <Link onClick={handleNotification} to={category !== 'person' ? `/${category}/${item.id}` : '#'} className="movie-item__link">
                    <img className="movie-item__image" src={`${item.poster_path || item.backdrop_path ? apiConfig.w200Image(item.poster_path || item.backdrop_path
                    ) : apiConfig.backupPhoto}` } 
                    alt={item.title || item.name} height="150%" loading="lazy" />
                    <div className="movie-item__desc">
                        <span className="movie-item__name">{item.title || item.name}</span>
                        {/* <p className="movie-item__date">Note that the</p> */}
                    </div>
                    <div className="movie-item__quanlity">HD</div>
                    <div className="movie-item__cent">{item.vote_average || 10}</div>
                </Link>
            </div>
        </div>
    );
};

export default MovieItem;