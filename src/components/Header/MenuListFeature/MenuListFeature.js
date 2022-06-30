import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/LoginSlice'
import './MenuListFeature.css'

function MenuListFeature() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("token")
    }
  return (
    <div className='list-feature__container'>
        <ul className='list-feature__list'>
            <li className='list-feature__item'>
                <i className="fa-solid fa-id-card icon-feature"></i>
                Profile
            </li>
            <li className='list-feature__item'>
            <i className="fa-solid fa-film icon-feature"></i>
                My Film
            </li>
            <li className='list-feature__item'>
                <i className="fa-solid fa-key icon-feature"></i>
                Password
            </li>
            <li className='list-feature__item' onClick={handleLogout }>
            <i className="fa-solid fa-arrow-right-from-bracket icon-feature"></i>
                Logout
            </li>
        </ul>
    </div>
  )
}

export default MenuListFeature