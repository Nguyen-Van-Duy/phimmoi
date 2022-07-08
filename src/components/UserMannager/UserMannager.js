import React, { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import "./UserManager.css"
import Profile from './Profile/Profile'
import { useSelector } from 'react-redux'
import apiConfig from '../../API/configApi'
import { useNavigate } from "react-router-dom";
import UploadMovie from './UploadMovie/UploadMovie'


function UserMannager() {
// const history = createBrowserHistory();
const dataUser = useSelector((state) => state.loginSlice.dataUser);
const isLogin = useSelector((state) => state.loginSlice.isLogin);
const navigate = useNavigate()
    useEffect(()=> {
        if(isLogin === false) {
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
            <Link to="/manager"><li className='manager-menu__item'>Profile</li></Link>
            <Link to="/manager/upload-movie"><li className='manager-menu__item'>Upload Movie</li></Link>
            <Link to="/manager/history"><li className='manager-menu__item'>History</li></Link>
            <Link to="/manager/movie"><li className='manager-menu__item'>My Movies</li></Link>
            <Link to="/manager/change-password"><li className='manager-menu__item'>Change Password</li></Link>
            </ul>
        </div>
    </div>
    <div className='manager-content'>
        <Routes>
            <Route path="" element={<Profile />} />
            <Route path="upload-movie" element={<UploadMovie />} />
            <Route path="history" element={<h2 style={{color: '#fff'}}>No</h2>} />
        </Routes>
    </div>
</div>}</>
  )
}

export default UserMannager