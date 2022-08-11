import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { menuList } from '../../../API/configApi'
import { logout } from '../../../store/LoginSlice'
import './MenuListFeature.css'

function MenuListFeature() {
    const dispatch = useDispatch()
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    
    let menu
    if(dataUser.role === "admin") {
        menu = menuList.filter(item=>item.path !== "/manager/movie-waiting")
        console.log(menu);
    } else if(dataUser.role === "user") {
        menu = menuList.filter(item=>item.path !== "/manager/approval-movie")
    }

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("token")
    }
  return (
    <div className='list-feature__container'>
        <ul className='list-feature__list'>
            {menu.map((item, index)=> <Link to={item.path} key={index}>
                <li className='list-feature__item'>
                    <i className={item.icon}></i>
                    {item.title}
                </li>
            </Link>)}

            <li className='list-feature__item' onClick={handleLogout }>
            <i className="fa-solid fa-arrow-right-from-bracket icon-feature"></i>
                Logout
            </li>
        </ul>
    </div>
  )
}

export default MenuListFeature