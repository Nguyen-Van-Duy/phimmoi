import { Result } from 'antd';
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import apiConfig, { success } from '../../../API/configApi'
import './Schedule.css'
import ScheduleUpdate from './ScheduleUpdate/SchuduleUpdate';
import { SmileOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useCallback } from 'react';

export default function Schedule() {
    const [movie, setMovie] = useState([])
    const [title, setTitle] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [dataDetail, setDataDetail] = useState()
    const [showUpdate, setShowUpdate] = useState(false)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);

    const handleShowScheduleUpdate = (data) => {
        setShowUpdate(!showUpdate)
        setDataDetail(data)
        setTitle("update")
    }

    const handleShowAddSchedule = (title) => {
        setShowUpdate(!showUpdate)
        setTitle(title)
    }
    const handleShowAddScheduleClose = () => {
        setShowUpdate(!showUpdate)
        setTitle(null)
        fetchDataSearch()
    }

    const fetchDataSearch = useCallback(async () => {
        const data = await axios.get(apiConfig.urlConnect + "upload/schedule/" + dataUser._id)
        console.log(data);
        setMovie(data.data)
        document.title = 'Movie schedule'
        setIsLoading(false)
    }, [])

    useEffect(() => {
        setIsLoading(true)
        fetchDataSearch()

    }, [dataUser._id, fetchDataSearch])

    const handleDeleteScheduleUpdate = async (data) => {
         await axios.delete(apiConfig.urlConnect + "upload/delete-schedule/" + data._id)
        success("Delete successful!")
        setMovie(d=>d.filter(item=>item._id !== data._id))
    }
    
  return (
    <>
    {!showUpdate && <div>
        <h2 className='profile_title'>Schedule</h2>
        <div style={{height: "50px"}}><span className='button blue' style={{float: "right", marginBottom: "1rem" }} onClick={()=>handleShowAddSchedule('add')}>Add</span></div>
        <div className='schedule_container'>
        {!isLoading && movie.length <= 0 && <Result
                    icon={<SmileOutlined />}
                    title="No Data!"
                />}
            <ul className='schedule_list'>
                {movie && movie.length > 0 && movie.map((item, id)=><li className='schedule_item' key={id}>
                <div style={{minWidth: "250px"}}><img style={{width: "100%"}}src={ apiConfig.urlConnectSocketIO + item.image } alt="" className='schedule_image' /></div>
                <div className='schedule_content'>
                    <span className='schedule_name'>{item.name}</span>
                    <div>{item.genres !== undefined && item.genres.map((items, id) => <span key={id}>{items.key || items.name}, </span>)}</div>
                    <div className='schedule_name'>{item.time}</div>
                    {/* {dataDetails.genres.map((item, id) => <span key={id}>{item.key || item.name}</span>)} */}
                    <div>{item.overview}</div>
                    <div style={{marginTop: "2rem"}}>
                        <span className='button blue' onClick={()=>handleShowScheduleUpdate(item)}>Update</span>
                        <span className='button red'onClick={()=>handleDeleteScheduleUpdate(item)}>Delete</span>
                    </div>
                </div>
                </li>)}
            </ul>
        </div>
    </div>}
    {showUpdate && title === "update" && <ScheduleUpdate dataDetail={dataDetail} title={title} handleShowAddScheduleClose={handleShowAddScheduleClose} />}
    {showUpdate && title === "add" && <ScheduleUpdate title={title} handleShowAddScheduleClose={handleShowAddScheduleClose} />}
    </>
  )
}
