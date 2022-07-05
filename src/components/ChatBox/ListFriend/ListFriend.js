import React, { useEffect, useState } from 'react'
import "../MessengerList/MessengerList.css"
import avatar from '../../../image/avatar.jpeg'
import apiConfig from '../../../API/configApi';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ListFriend({item, currentId, setUserChat, valueContentMenu, online}) {
  const [user, setUser] = useState(null)
  const [isOnline, setIsOnline] = useState(false)
//   const [invitation, setInvitation] = useState(valueContentMenu === 'message' && listInvitation)
  const dataUser = useSelector((state) => state.loginSlice.dataUser);

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
      if(valueContentMenu === 'admin' && dataUser.role !== "admin") {
        data = await axios.get(apiConfig.urlConnect + 'account/admin')
        // console.log(data);
        data = data.data[0]
      } else if(valueContentMenu === 'user'|| dataUser.role === "admin") {
        const data1 = await axios.get(apiConfig.urlConnect + 'account/user/' + friendId)
        data = data1.data
      }
      setUser(data)
    }
    if(valueContentMenu !== 'message') {
      getUser()
    }
  }, [currentId, item, valueContentMenu, dataUser.role, online])

  return (<>
    {valueContentMenu !== 'message' && <li className='messenger-friend__container' onClick={()=>setUserChat(user)}>
      <div className='messenger-friend__item'>
        <div className='messenger-friend__avatar user-offline'>
          <img src={avatar} alt='' />
          <div className={`user-status ${isOnline ? "user-online" : "user-offline"}`}></div>
        </div>
        <div className='messenger-friend__content'>
            <span className='messenger-friend__name'>{user?.user_name}</span>
            <span className='messenger-friend__desc'>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    </li>}

    </>
  )
}

export default ListFriend