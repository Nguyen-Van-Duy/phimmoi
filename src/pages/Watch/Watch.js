import React from 'react';
import Similar from '../../components/Similar/Similar';
import WatchMovie from '../../components/WatchMovie/WatchMovie';
import './Watch.css';

const Watch = () => {
    return (
        <div className='movie-container'>
            <WatchMovie />
            <div className='movie-container__similar'>
                <Similar />
            </div>
        </div>
    );
};

export default Watch;