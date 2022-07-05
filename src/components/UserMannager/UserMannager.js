import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import "./UserManager.css"
import avatar from "../../image/avatar.jpeg"
import Profile from './Profile/Profile'

function UserMannager() {
// const history = createBrowserHistory();

  return (
    <div className="manager__container">
        <div className='manager-menu'>
            <div className='manager-menu__header'>
                <img src={avatar} alt='' />
                <div className='manager-menu__header-desc'>
                    <span className='manager-menu__header-name'>Nguyễn Văn Duy</span>
                    <span className='manager-menu__header-email'>duy@gmail.com</span>
                </div>
            </div>
            <div className='manager-menu__body'>
                <ul className='manager-menu__list'>
                <Link to="/manager/profile"><li className='manager-menu__item'>Profile</li></Link>
                    <li className='manager-menu__item'>Nguyễn Văn Duy</li>
                    <li className='manager-menu__item'>Nguyễn Văn Duy</li>
                    <li className='manager-menu__item'>Nguyễn Văn Duy</li>
                    <li className='manager-menu__item'>Nguyễn Văn Duy</li>
                </ul>
            </div>
        </div>
        <div className='manager-content'>
            <Routes>
                <Route path="profile" element={<Profile />} />
                <Route path="history" element={<h2 style={{color: '#fff'}}>No</h2>} />
            </Routes>
        </div>
    </div>
  )
}

export default UserMannager