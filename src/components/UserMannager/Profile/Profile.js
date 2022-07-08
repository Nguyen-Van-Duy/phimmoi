import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import apiConfig from '../../../API/configApi';
import EditProfile from './EditProfile/EditProfile'
import { useNavigate } from "react-router-dom";
import './Profile.css'

function Profile() {
    const [showEditProfile, setShowEditProfile] = useState(false)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const isLogin = useSelector((state) => state.loginSlice.isLogin);
    const navigate = useNavigate()
    if(isLogin === false) {
        navigate('/')
    }
    const handleShowEditProfile = () => {
        setShowEditProfile(!showEditProfile)
    }
  return (<>
    {!showEditProfile && <div className='profile'>
        {/* <h2 className='profile_title'>Profile</h2> */}
        <div className='profile_head'>
            <div className='profile_header-image'>
                <img src={ apiConfig.urlConnectSocketIO + dataUser.avatar} alt="" />
                {/* <span>Edit image</span> */}
            </div>
            <div className='profile_content'>
                <span className='profile__name'>{dataUser.user_name}</span>
                <span className='profile__desc'>{dataUser.description|| "hello world!"}</span>
            </div>
        </div>
        <div className='profile_body'>
        <ul className="profile_list">
            <li className='profile_item'>
                <span className='profile_item-title'>Full name:</span><span> {dataUser.user_name}</span>
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Date of birth:</span><span> {dataUser.date_of_birth}</span>
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Hometown:</span><span> {dataUser.hometown}</span>
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Phone:</span><span> {dataUser.phone}</span>
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Loves:</span><span> {dataUser.loves}</span>
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Hates:</span><span> {dataUser.hates}</span>
            </li>
        </ul>
        <div className='profile-edit'>
            <span className="button blue" onClick={handleShowEditProfile}>
            <i className="fa-solid fa-user-pen"></i>Edit profile
            </span>
        </div>

        </div>
    </div>}
    {showEditProfile && <EditProfile handleShowEditProfile={handleShowEditProfile} />}
    </>
  )
}

export default Profile