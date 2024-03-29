import React, { useEffect, useState } from 'react'
import "./MessengerList.css"
import avatar from '../../../image/avatar.jpeg'
import apiConfig from '../../../API/configApi';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

function MessengerList({item, currentId, socket, valueContentMenu, listInvitation, handleAddFriendClient, online}) {
  const [invitation, setInvitation] = useState(valueContentMenu === 'message' && listInvitation)
  // const dataUser = useSelector((state) => state.loginSlice.dataUser);
  const [isSend, setIsSend] = useState(true)
  const [isDelete, setIsDelete] = useState(true)
  const isLogin = useSelector((state) => state.loginSlice.isLogin);

  //   add friend db
  const handleSendFriend = async (data) => {
    const params = {
      sender_id: currentId,
      receiver_id: data._id,
      sender_avatar: data?.avatar, 
      sender_name: data.user_name,
    }
    const result = await axios.post(apiConfig.urlConnect + 'message/invitation', params , apiConfig.headers )
    console.log("result", result);
    socket.emit("sendInvitationAddFriend", result.data );
    // const dataInvitation = await axios.get(apiConfig.urlConnect + 'message/invitation/' + currentId )
    //   console.log(dataInvitation);
    //   setInvitation(dataInvitation.data)
  }

  useEffect(()=> {
    console.log('222222222222');
    if(isSend && isLogin) {
      socket.on("getInvitationAddFriend", data=> {
        if(invitation && invitation.filter(item=>item._id === data._id).length<=0) {
          setInvitation(d=>[...d, data])
        }
      })
    }
    return ()=>{
      setIsSend(false)
    }
  }, [ socket, isSend, isLogin, listInvitation, invitation])

  useEffect(()=>{
    console.log('222222222222');
    if(isDelete && isLogin) {
      socket.on("getDeleteInvitation", (data) => {
        if(invitation && invitation.length >= 0) {
          const dataAfterDelete = invitation?.filter(item=>item._id !== data.id)
          setInvitation(dataAfterDelete)
        }
      });
    }

    return () => {
      setIsDelete(false)
    }
    
  }, [currentId, invitation, socket, isDelete, isLogin])

  const handleDeleteInvitation = async (sender_id, receiver_id) => {
    const dataInvitationDelete = invitation?.find(item => item.sender_id === sender_id && item.receiver_id === receiver_id)
    try {
      const dataInvitation = await axios.delete(apiConfig.urlConnect + 'message/invitation/' + dataInvitationDelete._id )
      console.log(dataInvitation);
      const dataAfterDelete = invitation?.filter(item=>item._id !== dataInvitationDelete._id)
      setInvitation(dataAfterDelete)
      console.log(dataAfterDelete);
      socket.emit("deleteInvitation", {
        id: dataInvitationDelete._id
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddFriend = async (receiver_id) => {
    try {
      const result = await axios.post(apiConfig.urlConnect + 'conversation/add-friend',{receiver_id: receiver_id, sender_id: currentId }, apiConfig.headers )
        if(result.status === 200) {
          const dataAfterDelete = invitation?.filter(item=>item._id !== receiver_id)
          setInvitation(dataAfterDelete)
          handleAddFriendClient(receiver_id)
          handleDeleteInvitation(currentId, receiver_id)
          alert("Success")
        } else {
          console.log("2");
        }
    } catch (e) {
      console.log(e);
    }
  }

  return (<>
    {invitation && valueContentMenu === 'message' && <li className='messenger-friend__container'>
      <div className='messenger-friend__item'>
        <div className='messenger-friend__avatar user-offline'>
          <img src={avatar} alt='' />
          <div className={`user-status ${online ? "user-online" : "user-offline"}`}></div>
        </div>
        <div className='messenger-friend__content'>
            <span className='messenger-friend__name'>{item?.user_name}</span>
            <span className='messenger-friend__desc'>{online ? "Online" : "Offline"}</span>
            {((invitation?.filter((items =>items.sender_id === item._id && items.receiver_id === currentId))).length > 0) ? <div className='message-friend__button'>
              <span className='green' onClick={()=>handleAddFriend(item._id)}>Xác nhận</span>
              <span className='red' onClick={()=>handleDeleteInvitation(item._id, currentId)}>Từ chối</span>
            </div> : ((invitation?.filter((items =>items.sender_id === currentId && items.receiver_id === item._id))).length > 0) ? <div className='message-friend__button'>
              <span className='blue'>Chờ xác nhận</span>
              <span className='red' onClick={()=>handleDeleteInvitation(currentId, item._id)}>Hủy</span>
            </div> : <div className='message-friend__button'>
              <span className='green' onClick={()=>handleSendFriend(item)}>Kết bạn</span>
            </div>}
        </div>
      </div>
    </li>}
    </>
  )
}

export default MessengerList