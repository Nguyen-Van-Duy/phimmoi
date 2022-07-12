import React from 'react'
import { useSelector } from 'react-redux';
import "./MenuChatBox.css"
const listMenuChat = [
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
        icon: "fa-solid fa-user-plus",
        title: "message",
    },
    {
        icon: "fa-solid fa-users",
        title: "group",
    }
]

function MenuChatBox({setShowListFriend, showListFriend, setValueContentMenu }) {
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    let menu
    if(dataUser.role === 'admin') {
        menu = listMenuChat.filter(d=>d.title !== "admin" && d.title !== "message")
    } else {
        menu = [...listMenuChat]
    }
    const handleShowContentMenu = (value)=>{
        if(value === "menu") {
            setShowListFriend(!showListFriend)
            setValueContentMenu("admin")
            return
        } else {
            setShowListFriend(true)
        }
        // console.log("Show", value);
        setValueContentMenu(value)
    }
  return (
    <nav className='chat-box__menu'>
        <ul className="box-menu__items">
            {menu.map((item, index)=> <li key={index} className="box-menu__item" onClick={()=>handleShowContentMenu(item.title)}>
                <i className={item.icon}></i>
            </li>)}
        </ul>
    </nav>
  )
}

export default MenuChatBox