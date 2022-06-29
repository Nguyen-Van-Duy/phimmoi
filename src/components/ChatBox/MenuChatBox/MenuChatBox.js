import React from 'react'
import "./MenuChatBox.css"

function MenuChatBox({setShowListFriend, showListFriend }) {
  return (
    <nav className='chat-box__menu'>
        <ul className="box-menu__items">
            <li className="box-menu__item" onClick={()=>{
                console.log("Show");
                setShowListFriend(!showListFriend)
            }}>
                <i className="fa-solid fa-sliders"></i>
            </li>
            <li className="box-menu__item">
                <i className="fa-solid fa-user-lock"></i>
            </li>
            <li className="box-menu__item">
                <i className="fa-solid fa-user-group"></i>
            </li>
        </ul>
    </nav>
  )
}

export default MenuChatBox