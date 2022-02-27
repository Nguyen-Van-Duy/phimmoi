import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { similar } from '../../API/MoviesApi';
import MovieList from '../MovieList/MovieList';

const Similar = () => {

    const [dataSimilar, setDataSimilar] = useState([])
    const params = useParams()

    useEffect(() => {
        const fetchDataSimilar = async () => {
            const data = await similar(params.category, params.id)
            setDataSimilar(data)
        }
        fetchDataSimilar()
    },[params.category, params.id])
    return (
        <div>
            {/* show movies */}
            <MovieList dataFilm={dataSimilar} titleFilm="Similar" category={params.category} type="similar" />
        </div>
    );
};

export default Similar;