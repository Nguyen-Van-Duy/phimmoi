import React, { useEffect, useState } from 'react'
import { Space } from 'antd';
import "../History/History.css"
import axios from 'axios';
import apiConfig, { success } from '../../../API/configApi';
import { useSelector } from 'react-redux';
import { Image } from 'antd';

function ApprovalMovie() {
    const [movie, setMovie] = useState([])
    const dataUser = useSelector(state=>state.loginSlice.dataUser)

    const handleDate = (time) => {
        const date = new Date(time)
        const day = time.slice(0, 10)
        const h = date.getHours()
        const m = date.getMinutes()
        const s = date.getSeconds()
        return day + ' ' + h + ":" + m + ":" + s
    }

    console.log(movie, dataUser);

      useEffect(()=> {
        const getDataHistory = async () => {
            const data = await axios.get(apiConfig.urlConnect + "movie/movie-waiting")
            setMovie(data.data.reverse())
        }
        getDataHistory()
      }, [dataUser._id])

  return (
    <div className='profile'>
        <h2 className='profile_title'>Approval Movie</h2>
        <Space direction="vertical">
            <div className='history__container'>
                {/* <span className='button'>Update</span>
                <span className='button'>Delete</span> */}
            </div>
        </Space>
        <table className='history__list'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Genres</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {movie && movie.map((item, id)=>
                <tr className='history__item' key={id}>
                    <td className='history__center'>
                        <Image src={(apiConfig.urlConnectSocketIO + item.backdrop_path)}  alt="" />
                    </td>
                    <td className='history__content-name'>{item.title || item.name}</td>
                    <td className='history__content-genres'>
                        {item.genres && item.genres.map((genres, genresId)=> <span key={genresId}>{genres.name || genres.key}, </span>)}
                    </td>
                    <td className='history__time'>{item.createdAt}</td>
                </tr>)}

            </tbody>
        </table>
    </div>
  )
}

export default ApprovalMovie