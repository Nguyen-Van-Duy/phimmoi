import React, { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import "./UserManager.css"
import Profile from './Profile/Profile'
import { useSelector } from 'react-redux'
import apiConfig from '../../API/configApi'
import { useNavigate } from "react-router-dom";
import UploadMovie from './UploadMovie/UploadMovie'
import MovieWaiting from './MovieWaiting/MovieWaiting'
import MyMovie from './MyMovie/MyMovie'
import ChangePassword from './ChangePassword/ChangePassword'
import Favourite from './Favourite/Favourite'
import History from './History/History'
import ApprovalMovie from './ApprovalMovie/ApprovalMovie'


function UserMannager() {
// const history = createBrowserHistory();
const dataUser = useSelector((state) => state.loginSlice.dataUser);
const isLogin = useSelector((state) => state.loginSlice.isLogin);
const navigate = useNavigate()
const location = useLocation()

console.log(location.pathname);
    useEffect(()=> {
        if(apiConfig.token && !isLogin) {
            navigate('/')
        }
    }, [isLogin, navigate])

  return (
    <>
    {isLogin && <div className="manager__container">
    <div className='manager-menu'>
        <div className='manager-menu__header'>
            <img src={dataUser?.avatar && apiConfig.urlConnectSocketIO + dataUser?.avatar} alt='' />
            <div className='manager-menu__header-desc'>
                <span className='manager-menu__header-name'>{dataUser?.user_name}</span>
                <span className='manager-menu__header-email'>{dataUser?.email}</span>
            </div>
        </div>
        <div className='manager-menu__body'>
            <ul className='manager-menu__list'>
                <Link to="/manager"><li className={`manager-menu__item ${location.pathname === "/manager" && "manager-active"}`}><i className="fa-solid fa-address-card"></i>Profile</li></Link>
                <Link to="/manager/upload-movie"><li className={`manager-menu__item ${location.pathname === "/manager/upload-movie" && "manager-active"}`}><i className="fa-solid fa-file-arrow-up"></i>Share Movie</li></Link>
                {dataUser.role === "admin" && 
                <Link to="/manager/approval-movie"><li className={`manager-menu__item ${location.pathname === "/manager/approval-movie" && "manager-active"}`}><i className="fa-solid fa-file-circle-question"></i>Approval Movie</li></Link>}
                {dataUser.role !== "admin" && 
                <Link to="/manager/movie-waiting"><li className={`manager-menu__item ${location.pathname === "/manager/movie-waiting" && "manager-active"}`}><i className="fa-solid fa-circle-question"></i>Movie waiting</li></Link>}
                <Link to="/manager/my-favourite"><li className={`manager-menu__item ${location.pathname === "/manager/my-favourite" && "manager-active"}`}><i className="fa-solid fa-heart"></i>favourite</li></Link>
                <Link to="/manager/history"><li className={`manager-menu__item ${location.pathname === "/manager/history" && "manager-active"}`}><i className="fa-solid fa-clock-rotate-left"></i>History</li></Link>
                <Link to="/manager/my-movie">
                    <li className={`manager-menu__item ${location.pathname === "/manager/my-movie" && "manager-active"}`}>
                    <i className="fa-solid fa-film"></i>My Movies</li>
                </Link>
                <Link to="/manager/change-password">
                    <li className={`manager-menu__item ${location.pathname === "/manager/change-password" && "manager-active"}`}>
                    <i className="fa-solid fa-lock"></i>Change Password</li>
                </Link>
            </ul>
        </div>
    </div>
    <div className='manager-content'>
        <Routes>
            <Route path="" element={<Profile />} />
            <Route path="upload-movie" element={<UploadMovie />} />
            <Route path="approval-movie" element={<ApprovalMovie />} />
            <Route path="movie-waiting" element={<MovieWaiting />} />
            <Route path="my-movie" element={<MyMovie />} />
            <Route path="my-favourite" element={<Favourite />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="history" element={<History />} />
        </Routes>
    </div>
</div>}</>
  )
}

export default UserMannager