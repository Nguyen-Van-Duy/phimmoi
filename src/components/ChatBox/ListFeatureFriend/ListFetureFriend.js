import axios from 'axios'
import React, { useState } from 'react'
import "./ListFeatureFriend.css"

function ListFetureFriend({userChatId, idAdmin}) {
    const [isShowCreate, setIsShowCreate] = useState(false)
    const handleCreateGroup = async () => {
        // const result = await axios.post()
    }
  return (
    <>
    {isShowCreate && <div className='new-group'>
        <input type="text" />
        <div className='message-header__left' onClick={()=>setIsShowCreate(false)}>
            <i className="fa-solid fa-xmark message-close"></i>
        </div>
    </div>}
    <ul className='feature-chat__list'>
        <li className='feature-chat__item' onClick={()=>setIsShowCreate(true)}><i className="fa-solid fa-users"></i>Create new group</li>
        {userChatId !== idAdmin && <li className='feature-chat__item'><i className="fa-solid fa-user-xmark"></i>Delete friend</li>}
    </ul>
    </>
  )
}

export default ListFetureFriend