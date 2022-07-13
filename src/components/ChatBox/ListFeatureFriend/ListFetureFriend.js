import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiConfig from '../../../API/configApi'
import "./ListFeatureFriend.css"

function ListFetureFriend({idAdmin, userChat, setUserConversation, userConversation, setMessage, setCurrentChat, setUserChat}) {
    const [isShowCreate, setIsShowCreate] = useState(false)
    const dataUser = useSelector((state) => state.loginSlice.dataUser);

    const handleCreateGroup = async (e) => {
        e.preventDefault()
        const params = {
            room_name: e.target[0].value.trim(),
            sender_id: userConversation[0].members[0],
            receiver_id: userConversation[0].members[1],
            room_master: dataUser._id
        }
        console.log(userConversation[0], params);
        try {
            const dataInvitation = await axios.post(apiConfig.urlConnect + 'conversation/add-group', params)
            console.log(dataInvitation);
            setIsShowCreate(false)
        } catch(err) {
            console.log(err);
        }
    }

    const handleDeleteFriend = async (conversationId) => {
        try {
            const dataInvitation = await axios.delete(apiConfig.urlConnect + 'conversation/' + conversationId)
            const newConversation = userConversation.filter(item=> item._id !== conversationId)
            setUserConversation(newConversation)
            console.log(dataInvitation);
            setMessage(null)
            setCurrentChat(null)
            setUserChat(null)
        } catch(err) {
            console.log(err);
        }
    }


    console.log(dataUser);
  return (
    <>
    {isShowCreate && <div className='message-modal' onClick={()=>setIsShowCreate(false)}></div>}
    {isShowCreate && <div className='new-group'>
        <div className='new-group__header'>
            <span>Create new group</span>
            <div className='message-header__left' onClick={()=>setIsShowCreate(false)}>
                <i className="fa-solid fa-xmark message-close"></i>
            </div>
        </div>
        <form className='message-form' onSubmit={handleCreateGroup}>
            <input type="text" name="roomName" placeholder='enter room name' />
            <button type='submit'>Create</button>
        </form>
    </div>}
    <ul className='feature-chat__list'>
        <li className='feature-chat__item' onClick={()=>setIsShowCreate(true)}><i className="fa-solid fa-users"></i>Create new group</li>
        {userChat._id !== idAdmin && <li className='feature-chat__item' onClick={()=>handleDeleteFriend(userChat.conversationId)}><i className="fa-solid fa-user-xmark"></i>Delete friend</li>}
    </ul>
    </>
  )
}

export default ListFetureFriend