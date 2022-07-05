import React from 'react'
import './Profile.css'

function Profile() {
  return (
    <div className='profile'>
        <h2 className='profile_title'>Profile</h2>
        <div className='profile_head'>
            <img src='' alt="" />
            <div className='profile_content'>
                <span className='profile__name'>Name</span>
                <span className='profile__desc'>Description</span>
            </div>
        </div>
        <div className='profile_body'>
        <ul class="profile_list">
            <li className='profile_item'>
                <span className='profile_item'></span>
            </li>
        </ul>
        </div>
    </div>
  )
}

export default Profile