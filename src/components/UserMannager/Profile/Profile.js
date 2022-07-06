import React, { useState } from 'react'
import EditProfile from './EditProfile/EditProfile'
import './Profile.css'

function Profile() {
    const [showEditProfile, setShowEditProfile] = useState(false)

    const handleShowEditProfile = () => {
        setShowEditProfile(!showEditProfile)
    }
  return (<>
    {!showEditProfile && <div className='profile'>
        {/* <h2 className='profile_title'>Profile</h2> */}
        <div className='profile_head'>
            <div className='profile_header-image'>
                <img src='http://localhost:8080/image/avatar.jpeg' alt="" />
                <span>Edit image</span>
            </div>
            <div className='profile_content'>
                <span className='profile__name'>Name</span>
                <span className='profile__desc'>This code is close to the previous case except that the condition for the callback to be executed is to wait 5000ms.</span>
            </div>
        </div>
        <div className='profile_body'>
        <ul className="profile_list">
            <li className='profile_item'>
                <span className='profile_item-title'>Full name:</span> Nguyễn Văn Duy
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Date of birth:</span> 23/34/1234
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Hometown:</span> 2343645675467
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Phone:</span> 2343645675467
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Loves:</span> 2343645675467
            </li>
            <li className='profile_item'>
                <span className='profile_item-title'>Hates:</span> 2343645675467
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