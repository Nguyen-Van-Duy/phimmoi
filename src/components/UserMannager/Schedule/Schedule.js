import { Result } from 'antd';
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import apiConfig from '../../../API/configApi'
import './Schedule.css'
import ScheduleUpdate from './ScheduleUpdate/SchuduleUpdate';
import { SmileOutlined } from '@ant-design/icons';

export default function Schedule() {
    const [movie, setMovie] = useState([{
        name: "The flash",
        overview: "Gửi các sinh viên trong danh sách làm ĐATN kỳ 1 2021-2022. Đến ngày 10/10/2022 bộ môn sẽ cho phép những bạn được GVHD chấp nhận cho gặp phản biện được lên danh sách phản biện. Các sinh viên thuộc diện: Xin lùi sang đợt 3,trượt PB các đợt trước và BV trượt đợt trước có cơ hội cuối này. Các b",
        time: "10/10/2022",
        date: "10/10/2022",
    },
    {
        name: "The flash",
        overview: "Gửi các sinh viên trong danh sách làm ĐATN kỳ 1 2021-2022. Đến ngày 10/10/2022 bộ môn sẽ cho phép những bạn được GVHD chấp nhận cho gặp phản biện được lên danh sách phản biện. Các sinh viên thuộc diện: Xin lùi sang đợt 3,trượt PB các đợt trước và BV trượt đợt trước có cơ hội cuối này. Các b",
        time: "10/10/2022",
        date: "10/10/2022",
    }])
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

    const handleShowAddSchedule = (data) => {
        setShowUpdate(!showUpdate)
        setTitle("add")
    }
    
  return (
    <>
    {!showUpdate && <div>
        <h2 className='profile_title'>Schedule</h2>
        <div style={{height: "50px"}}><span className='button blue' style={{float: "right", marginBottom: "1rem" }} onClick={handleShowAddSchedule}>Add</span></div>
        <div className='schedule_container'>
        {!isLoading && movie.length <= 0 && <Result
                    icon={<SmileOutlined />}
                    title="No Data!"
                />}
            <ul className='schedule_list'>
                {movie && movie.length > 0 && movie.map((item, id)=><li className='schedule_item' key={id}>
                <div style={{maxWidth: "250px"}}><img src={ apiConfig.urlConnectSocketIO + dataUser.avatar} alt="" className='schedule_image' /></div>
                <div className='schedule_content'>
                    <span className='schedule_name'>{item.name}</span>
                    <div className='schedule_name'>{item.time}</div>
                    {/* {dataDetails.genres.map((item, id) => <span key={id}>{item.key || item.name}</span>)} */}
                    <p>{item.overview}
                    </p>
                    <div>
                        <span className='button blue' onClick={()=>handleShowScheduleUpdate(item)}>Update</span>
                        <span className='button red'>Delete</span>
                    </div>
                </div>
                </li>)}
            </ul>
        </div>
    </div>}
    {showUpdate && title === "update" && <ScheduleUpdate dataDetail={dataDetail} title={title} />}
    {showUpdate && title === "add" && <ScheduleUpdate title={title} />}
    </>
  )
}
