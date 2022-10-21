import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { similar, viewGenreMovies } from '../../API/MoviesApi';
import MovieList from '../MovieList/MovieList';

const Similar = ({idGenres}) => {
    console.log(idGenres);
    const [dataSimilar, setDataSimilar] = useState([])
    const params = useParams()

    useEffect(() => {
        const fetchDataSimilar = async () => {
            let data
            if(params.id.toString().length < 8) {
                data = await similar(params.category, params.id)
            } else {
                data = await viewGenreMovies('movie', idGenres.value, 1)
                data = data.results
            }
            console.log(data);
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