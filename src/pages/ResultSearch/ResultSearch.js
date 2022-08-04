import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import { dataSearch } from '../../API/MoviesApi';
import MovieItem from '../../components/MovieList/MovieItem';
import '../../components/MovieList/MovieList.css';
import '../ViewMore/ViewMore.css';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

const ResultSearch = () => {

    const params = useParams()
    const [dataFilm, setDataFilm] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // const [totalPage, setTotalPage] = useState(0)
    // const [current, setCurrent] = useState(20);

    const handlePage = () => {
        setPage(page + 1)
        const fetchDataSearch = async () => {
            const data = await dataSearch(params.keyword, page + 1)
            setDataFilm(d => [...d,...data.results])
        }
        fetchDataSearch()
    }

    useEffect(() => {
        const fetchDataSearch = async () => {
            const data = await dataSearch(params.keyword)
            setTotalResults(data.total_results)
            // setTotalPage(data.total_pages)
            setDataFilm(data.results)
            document.title = 'Result for ' + params.keyword
            window.scrollTo(0, 0)
        }
        fetchDataSearch()

    }, [params.keyword])

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
      };

    const handleChangePage = async (pages) => {
        setPage(pages);
        const data = await dataSearch(params.keyword, pages)
            // setTotalResults(data.total_results)
            // setTotalPage(data.total_pages)
            setDataFilm(data.results)
            window.scrollTo(0, 0)
    };

    return (<>
        {dataFilm.length > 0 && <div className="content-list">
            <div className="movie-list view-more__container">
                <div className="movie-list__header">
                    <span className="movie-list__title">Results for "{params.keyword}" ({totalResults})</span>
                </div>
                <div className="movie-list__view-more">
                    {dataFilm.map((item, index) => {
                        return item.media_type !== "person" && <div className="view-more__item" key={index} >
                        <MovieItem item={item} category={item.media_type} />
                        </div>
                    })}
                </div>
                <div className="load-more">
                <Pagination
                    onChange={handleChangePage}
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={totalResults}
                    defaultPageSize={20}
                    showSizeChanger={false}
                    />
                </div>
            </div>
        </div>}
        </>
    );
};

export default ResultSearch;