import React from 'react'
import "./MenuChatBox.css"
let listMenuChat = [
    {
        icon: "fa-solid fa-sliders",
        title: "menu",
    },
    {
        icon: "fa-solid fa-user-lock",
        title: "admin",
    },
    {
        icon: "fa-solid fa-user-group",
        title: "user",
    },
    {
        icon: "fa-solid fa-user-group",
        title: "message",
    }
]

function MenuChatBox({setShowListFriend, showListFriend, setValueContentMenu }) {
    const handleShowContentMenu = (value)=>{
        if(value === "menu") {
            setShowListFriend(!showListFriend)
        } else {
            setShowListFriend(true)
        }
        // console.log("Show", value);
        setValueContentMenu(value)
    }
  return (
    <nav className='chat-box__menu'>
        <ul className="box-menu__items">
            {listMenuChat.map((item, index)=> <li key={index} className="box-menu__item" onClick={()=>handleShowContentMenu(item.title)}>
                <i className={item.icon}></i>
            </li>)}
        </ul>
    </nav>
  )
}

export default MenuChatBox