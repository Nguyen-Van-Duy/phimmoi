import { DatePicker, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import apiConfig from '../../API/configApi';
import { countries, dataSearch, genderMovie } from '../../API/MoviesApi';
import moment from 'moment';
import MovieItem from '../../components/MovieList/MovieItem';
import '../../components/MovieList/MovieList.css';
import '../ViewMore/ViewMore.css';
import './NewMovie.css'
const { Option } = Select;

const NewMovie = () => {
    
    const params = useParams()
    const [dataFilm, setDataFilm] = useState([])
    const [page, setPage] = useState(1)
    // const [totalResults, setTotalResults] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

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
            const data = await axios.get(apiConfig.urlConnect + "/movie/all")
            console.log(data);
            // setTotalResults(data.total_results)
            // setTotalPage(data.total_pages)
            setDataFilm(data.data)
            document.title = 'New Movie'
        }
        fetchDataSearch()

    }, [params.keyword])

    const handleFilterDate = (date, dateString) => {
        console.log(dateString);
    }

    const disabledYear = (current) => {
        // Can not select days before today and today
        return current.year() > moment().format('YYYY');
      };

    return (<>
        {dataFilm.length > 0 && <div className="content-list">
            <div className="movie-list view-more__container">
                <div className="movie-list__header">
                    <span className="movie-list__title">New Movie</span>
                </div>
                <div className='new-movie__filter'>
                    <DatePicker onChange={handleFilterDate}  disabledDate={disabledYear} picker="year" className='history__time' />
                   <span className='filter-item'>
                    <Select
                            placeholder={countries[0].key}
                            allowClear
                            >
                            {countries.map((item, id)=><Option value={item.value} key={id}>{item.key}</Option>)}
                        </Select>
                   </span>
                   <span className='filter-item'>
                    <Select
                        placeholder="Select genre"
                        allowClear
                        >
                        {genderMovie.map((item, id)=><Option value={item.value} key={id}>{item.key}</Option>)}
                    </Select>
                    </span>
                </div>
                <div className="movie-list__view-more">
                    {dataFilm.map((item, index) => {
                        return item.media_type !== "person" && <div className="view-more__item" key={index} >
                        <MovieItem item={item} category={item.media_type} />
                        </div>
                    })}
                </div>
                {totalPage > page && <div className="load-more">
                    <span className="button green" onClick={handlePage}>Load More</span>
                </div>}
            </div>
        </div>}
        </>
    );
};

export default NewMovie;