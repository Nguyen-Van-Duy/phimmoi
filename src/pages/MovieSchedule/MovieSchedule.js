import { DatePicker, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import apiConfig from '../../API/configApi';

import '../../components/MovieList/MovieList.css';
import '../ViewMore/ViewMore.css';
import './MovieSchedule.css'
import { useSelector } from 'react-redux';

const MovieSchedule = () => {
    const [dataSchedule, setDataSchedule] = useState()
    const dataUser = useSelector((state) => state.loginSlice.dataUser);

    useEffect(() => {
        const fetchDataSearch = async () => {
            const data = await axios.get(apiConfig.urlConnect + "upload/schedule")
            console.log(data);
            // setTotalResults(data.total_results)
            // setTotalPage(data.total_pages)
            setDataSchedule(data.data)
            document.title = 'Movie schedule'
        }
        fetchDataSearch()

    }, [])


    return (<>
        {<div className="content-list">
            <div className="movie-list view-more__container">
                <div className="movie-list__header">
                    <span className="movie-list__title">Movie schedule</span>
                </div>
                <ul className='schedule_list'>
                    {dataSchedule && dataSchedule.length > 0 && dataSchedule.map((item, index) => 
                    <li key={index} className="schedule_item">
                        <img src={ apiConfig.urlConnectSocketIO + item.image } alt="" />
                        <div className="schedule_content">
                            <h3>{item.name}</h3>
                            <p>{item.time}</p>
                            <br />
                            <div>
                                {item.genres !== undefined && item.genres.map((items, id) => <span key={id}>{items.key || items.name}</span>)}
                            </div>
                            <p>{item.overview}</p>
                        </div>
                    </li>)}
                </ul> 
            </div>
        </div>}
        </>
    );
};

export default MovieSchedule;