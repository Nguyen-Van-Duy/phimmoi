import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { genreMovies } from '../../../API/MoviesApi';
import './Genre.css'

const Genre = () => {

    const [movieGenre, setMovieGenre] = useState([])
    const [TVGenre, setTVGenre] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const dataMovie = await genreMovies('movie')
            const dataTV = await genreMovies('tv')
            setMovieGenre(dataMovie.genres)
            setTVGenre(dataTV.genres)
        }
        fetchData()
    }, [])
    return (
        <div className="header__menu-genre">
            <div className="list-genre">
                <h3 className="list-genre__title">Movie Genre</h3>
                <ul className="list-menu__genre">
                    {movieGenre && movieGenre.length > 0 && movieGenre?.map((item, id) => <li key={id} className="list-genre__item">
                        <NavLink
                            className="header__menu-link list__menu-link"
                            to={`/movie/genre/${item.id}/${item.name}`}
                            >
                            {item.name}
                            </NavLink>
                        </li>)}
                </ul>
            </div>
            <div className="list-genre">
                <h3 className="list-genre__title">TV Genre</h3>
                <ul className="list-menu__genre">
                    {TVGenre.length > 0 && TVGenre?.map((item, id) => <li key={id} className="list-genre__item">
                    <NavLink
                        className="header__menu-link list__menu-link"
                        to={`/tv/genre/${item.id}/${item.name}`}
                        >
                        {item.name}
                    </NavLink>
                        
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default Genre;