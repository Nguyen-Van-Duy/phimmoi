import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataMovie, movieType, trending, tvType } from '../../API/MoviesApi';
import MovieItem from '../../components/MovieList/MovieItem';
import './ViewMore.css';

const ViewMore = () => {
    
    const [dataFilm, setDataFilm] = useState([])
    const [page, setPage] = useState(1)
    const params = useParams()

    let title
    if(params.category === 'movie') {
        title = movieType.filter(item => item.category === params.type)[0]
    } else {
        title = tvType.filter(item => item.category === params.type)[0]
    }

    const handlePage = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        const fetchDataFilm = async () => {
            let data
            if(params.type === "week" || params.type === "day" || params.type === "month") {
                data = await trending(params.category, params.type, page)
            } else {
                data = await dataMovie(params.category, params.type, page)
            }
            setDataFilm(d => [...d, ...data])
        }
        fetchDataFilm()
    }, [page, params.category, params.type])

    return (
        <div className="content-list">
            <div className="movie-list view-more__container">
                <div className="movie-list__header">
                    <span className="movie-list__title">{title.name}</span>
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

export default ViewMore;