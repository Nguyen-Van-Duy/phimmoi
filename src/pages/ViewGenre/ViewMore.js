import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {viewGenreMovies } from '../../API/MoviesApi';
import MovieItem from '../../components/MovieList/MovieItem';
import './ViewMore.css';

const ViewGenreMovie = () => {
    
    const [dataFilm, setDataFilm] = useState([])
    const [page, setPage] = useState(1)
    const params = useParams()

    console.log(params)

    const handlePage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [params.category, params.id])

    useEffect(() => {
        setDataFilm([])
    }, [params.category, params.id])

    useEffect(() => {
        const fetchDataFilm = async () => {
            
            const data = await viewGenreMovies(params.category, params.id, page)
            console.log(data.results)
            setDataFilm(d => [...d, ...data.results])
        }
        fetchDataFilm()
    }, [page, params.category, params.id])

    return (
        <div className="content-list">
            <div className="movie-list view-more__container">
                <div className="movie-list__header">
                    <span className="movie-list__title">{params.name}</span>
                </div>
                <div className="movie-list__view-more">
                    {dataFilm.map((item, index) => <div className="view-more__item" key={index} >
                        <MovieItem item={item} category={params.category} />
                        </div>)}
                </div>
                <div className="load-more">
                    <span className="button green" onClick={handlePage}>Load More</span>
                </div>
            </div>
        </div>
    );
};

export default ViewGenreMovie;