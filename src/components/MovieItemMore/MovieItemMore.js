import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../API/configApi';
import './MovieItemMore.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieItemMore = ({item, category}) => {

    return (
        <>
        <Link to={`/${category}/${item.id}/watch`}>
            <li className="watch-movie__item">
                <LazyLoadImage className={`watch-movie__image ${category === 'tv' && 'image-tv'}`}
                effect="black-and-white"
                src={item.backdrop_path || item.poster_path ? apiConfig.w300Image(item.backdrop_path || item.poster_path) : apiConfig.backupPhoto} 
                alt="backdrop" />
                <div className="watch-movie__info">
                    <p className="watch-movie__name">{item.title || item.name}</p>
                </div>
            </li>
        </Link>
        </>
    );
};

export default MovieItemMore;