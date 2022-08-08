import React, { useEffect, useState } from 'react'
import "../MessengerList/MessengerList.css"
import apiConfig from '../../../API/configApi';
import axios from 'axios';
// import { useSelector } from 'react-redux';

function ListFriend({item, currentId, setUserChat, valueContentMenu, online, notification}) {
  const [user, setUser] = useState(null)
  // const [friendId, setFriendId] = useState(null)
  const [isOnline, setIsOnline] = useState(false)
  const [notificationNumber, setNotificationNumber] = useState(null)
//   const [invitation, setInvitation] = useState(valueContentMenu === 'message' && listInvitation)
  // const dataUser = useSelector((state) => state.loginSlice.dataUser);
  console.log(item);

  // useEffect(()=> {
  //     if(friendId && online.length > 0) {
  //       const isUserOnline = online.filter(user=>user.userId === friendId)
  //       if(isUserOnline.length > 0) {
  //           setIsOnline(true)
  //       } else {
  //           setIsOnline(false)
  //       }
  //     }
  // }, [friendId, online])

  // useEffect(()=> {
  //   const friend = item.members.find(f=> f !== currentId)
  //   setFriendId(friend)
  // }, [currentId, item.members])

  useEffect(()=> {
    const getUser = async () => {
      const friendId = item.members.find(f=> f !== currentId)
      if(online.length > 0) {
        const isUserOnline = online.filter(user=>user.userId === friendId)
        if(isUserOnline.length > 0) {
            setIsOnline(true)
        } else {
            setIsOnline(false)
        }
      }
      
      let data
      if(valueContentMenu === 'admin') {
        data = await axios.get(apiConfig.urlConnect + 'account/admin')
        const dataProfile = await axios.get(apiConfig.urlConnect + 'account/profile/' + data.data[0]._id)
        data = {...data.data[0], avatar: dataProfile.data[0].avatar}
      } else if(valueContentMenu === 'user') {
        const dataProfile = await axios.get(apiConfig.urlConnect + 'account/profile/' + friendId)
        const data1 = await axios.get(apiConfig.urlConnect + 'account/user/' + friendId)
        data = {...data1.data, avatar: dataProfile.data[0].avatar}
      }
      setUser(data)
    }
    if(valueContentMenu !== 'message' && currentId && item.members && online) {
      getUser()
    }
  }, [valueContentMenu, currentId, item.members, online])

  useEffect(()=> {
    if(notification) {
    setNotificationNumber(notification)
    }
  }, [notification])

  console.log(user);

  return (<>
    {valueContentMenu !== 'message' && <li className='messenger-friend__container' onClick={()=>setUserChat({...user, conversationId: item._id, room_name: item?.room_name})}>
      <div className='messenger-friend__item'>
        <div className='messenger-friend__avatar user-offline'>
          <img src={user && (apiConfig.urlConnectSocketIO + user.avatar) } alt='' />
          <div className={`user-status ${isOnline ? "user-online" : "user-offline"}`}></div>
          {notificationNumber && notificationNumber.notification !== "0" && <div className="user-notification">{notificationNumber.notification}</div>}
        </div>
        <div className='messenger-friend__content'>
            <span className='messenger-friend__name'>{item.room_name || user?.user_name}</span>
            <span className='messenger-friend__desc'>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    </li>}

    </>
  )
}

export default ListFriend