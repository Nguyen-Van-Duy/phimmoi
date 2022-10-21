import React from 'react';
import { useState } from 'react';
import Similar from '../../components/Similar/Similar';
import WatchMovie from '../../components/WatchMovie/WatchMovie';
import './Watch.css';

const Watch = () => {
    const [genres, setGenres] = useState()
    const getGenres = (data) => {
        setGenres(data)
    }
    return (
        <div className='movie-container'>
            <WatchMovie getGenres={getGenres} />
            <div className='movie-container__similar'>
                {genres && <Similar idGenres={genres} />}
            </div>
        </div>
    );
};

export default Watch;