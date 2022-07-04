import React, { useEffect, useState } from 'react'
import "./MessengerList.css"
import avatar from '../../../image/avatar.jpeg'
import apiConfig from '../../../API/configApi';
import axios from 'axios';

function MessengerList({item, currentId, setUserChat, valueContentMenu, listInvitation, handleAddFriendClient}) {
  const [user, setUser] = useState(null)
  const [invitation, setInvitation] = useState(valueContentMenu === 'message' && listInvitation)
  console.log(listInvitation);

  //   add friend db
  const handleSendFriend = async (data) => {
    const params = {
      sender_id: currentId,
      receiver_id: data._id,
      sender_avatar: data?.avatar, 
      sender_name: data.user_name,
    }
    const result = await axios.post(apiConfig.urlConnect + 'message/invitation', params , apiConfig.headers )
    console.log(result);
    const dataInvitation = await axios.get(apiConfig.urlConnect + 'message/invitation/' + currentId )
      console.log(dataInvitation);
      setInvitation(dataInvitation.data)
  }

  // useEffect(()=>{
  //   setInvitation(listInvitation)
  // }, [])
  
  // useEffect(()=>{
  //   const getInvitation = async () => {
  //     const result = await axios.get(apiConfig.urlConnect + 'message/invitation/' + currentId )
  //     console.log(result);
  //     setInvitation(result.data)
  //   }
  //   getInvitation()
  // }, [currentId])

  useEffect(()=> {
    const getUser = async () => {
      const friendId = item.members.find(f=> f !== currentId)
      let data
      if(valueContentMenu === 'admin') {
        data = await axios.get(apiConfig.urlConnect + 'account/admin')
        data = data.data[0]
        console.log(data);
      } else if(valueContentMenu === 'user') {
        data = await axios.get(apiConfig.urlConnect + 'account/user/' + friendId).data
        console.log(data);
      }
      setUser(data)
    }
    if(valueContentMenu !== 'message') {
      getUser()
    }
  }, [currentId, item ,valueContentMenu])

  const handleDeleteInvitation = async (sender_id, receiver_id) => {
    const dataInvitationDelete = invitation?.find(item => item.sender_id === sender_id && item.receiver_id === receiver_id)
    try {
      const dataInvitation = await axios.delete(apiConfig.urlConnect + 'message/invitation/' + dataInvitationDelete._id )
      console.log(dataInvitation);
      const dataAfterDelete = invitation?.filter(item=>item._id !== dataInvitationDelete._id)
      setInvitation(dataAfterDelete)
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddFriend = async (receiver_id) => {
    try {
      const result = await axios.post(apiConfig.urlConnect + 'conversation/add-friend',{receiver_id: receiver_id, sender_id: currentId }, apiConfig.headers )
        console.log(result);
        if(result.status === 200) {
          const dataAfterDelete = invitation?.filter(item=>item._id !== receiver_id)
          setInvitation(dataAfterDelete)
          handleAddFriendClient(receiver_id)
          alert("Success")
        } else {
          console.log("2");
        }
    } catch (e) {
      console.log(e);
    }
  }

  return (<>
    {valueContentMenu !== 'message' && <li className='messenger-friend__container' onClick={()=>setUserChat(user)}>
      <div className='messenger-friend__item'>
        <img src={avatar} alt='' />
        <div className='messenger-friend__content'>
            <span className='messenger-friend__name'>{user?.user_name}</span>
            <span className='messenger-friend__desc'>Hôm nay là thứ 7</span>
        </div>
      </div>
    </li>}
    {invitation && valueContentMenu === 'message' && <li className='messenger-friend__container'>
      <div className='messenger-friend__item'>
        <img src={avatar} alt='' />
        <div className='messenger-friend__content'>
            <span className='messenger-friend__name'>{item?.user_name}</span>
            <span className='messenger-friend__desc'>Chưa kết bạn</span>
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