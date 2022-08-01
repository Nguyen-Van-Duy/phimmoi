import React, { useEffect, useState } from 'react'
import { Result, Space } from 'antd';
import "../History/History.css"
import axios from 'axios';
import apiConfig, { success } from '../../../API/configApi';
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import Approval from '../Approval/Approval';
import Modal from '../../Modal/Modal';
import { SmileOutlined } from '@ant-design/icons';
import Loading from '../../Loading';

function ApprovalMovie() {
    const [movie, setMovie] = useState([])
    const dataUser = useSelector(state=>state.loginSlice.dataUser)
    const [showModal, setShowModal] = useState(false)
    const [movieApproval, setMovieApproval] = useState({})
    const [isLoading, setIsLoading] = useState(true)

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
            setIsLoading(false)
        }
        getDataHistory()
      }, [dataUser._id])

      const handleShowApprovalMovie = data => {
        setMovieApproval(data)
        setShowModal(!showModal)
      }

      const handleApproval = (movieId) => {
        const newMovie = movie.filter(item=>item._id !== movieId)
        setMovie(newMovie)
        success("Approved success!")
      }

  return (
    <>
    <div onClick={()=>setShowModal(!showModal)}><Modal showModal={showModal} /></div>
    {showModal && <Approval setShowModal={()=>setShowModal(!showModal)} movieApproval={movieApproval} approval={handleApproval} />}
    <div className='profile'>
        <h2 className='profile_title'>Approval Movie</h2>
        <Space direction="vertical">
            <div className='history__container'>
                {/* <span className='button'>Update</span>
                <span className='button'>Delete</span> */}
            </div>
        </Space>
        {isLoading && <div className="manager-loading loading"><Loading /></div>}
        {!isLoading && movie && movie.length > 0 ? <table className='history__list'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>User</th>
                    <th>Time</th>
                    <th>Approval</th>
                </tr>
            </thead>
            <tbody>
                {movie.map((item, id)=>
                <tr className='history__item' key={id}>
                    <td className='history__center'>
                        <Image src={(apiConfig.urlConnectSocketIO + item.backdrop_path)}  alt="" />
                    </td>
                    <td className='history__content-name' onClick={()=>handleShowApprovalMovie(item)}>
                        {item.title || item.name}
                    </td>
                    <td className='history__content-genres'>
                        {item.user_name}
                    </td>
                    <td className='history__time'>{handleDate(item.createdAt)}</td>
                    <td>
                        <span className='button green history__button'>Yes</span>
                        <span className='button red history__button'>No</span>
                    </td>
                </tr>)}

            </tbody>
        </table>: <>{!isLoading && <Result
                icon={<SmileOutlined />}
                title="No Data!"
            />}</>}
    </div>
    </>

  )
}

export default ApprovalMovie