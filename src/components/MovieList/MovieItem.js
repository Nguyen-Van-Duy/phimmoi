import React from 'react';
import './MovieItem.css';
import "./MovieList.css";
import apiConfig from '../../API/configApi';
import { Link } from 'react-router-dom';

const MovieItem = ({item, category}) => {
    return (
        <div className="movie-item">
            <div className="movie-item__content">
                <Link to={`/${category}/${item.id}`} className="movie-item__link">
                    <img className="movie-item__image" src={`${apiConfig.w200Image(item.poster_path || item.backdrop_path )}`} 
                    alt={item.title || item.name} height="150%" />
                    <div className="movie-item__desc">
                        <span className="movie-item__name">{item.title || item.name}</span>
                        {/* <p className="movie-item__date">Note that the</p> */}
                    </div>
                    <div className="movie-item__quanlity">HD</div>
                    <div className="movie-item__cent">{Math.round(item.vote_average/10*100)}%</div>
                </Link>
            </div>
        </div>
    );
};

export default MovieItem;