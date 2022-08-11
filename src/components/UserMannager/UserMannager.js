import React, { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import "./UserManager.css"
import Profile from './Profile/Profile'
import { useSelector } from 'react-redux'
import apiConfig, { menuList } from '../../API/configApi'
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

let menu
if(dataUser.role === "admin") {
    menu = menuList.filter(item=>item.path !== "/manager/movie-waiting")
    console.log(menu);
} else if(dataUser.role === "user") {
    menu = menuList.filter(item=>item.path !== "/manager/approval-movie")
}

console.log(menuList, menu);

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
                {menu.map((item, index)=> <Link to={item.path} key={index}>
                    <li className={`manager-menu__item ${location.pathname === item.path && "manager-active"}`}>
                        <i className={item.icon}></i>{item.title}
                    </li>
                </Link>)}
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