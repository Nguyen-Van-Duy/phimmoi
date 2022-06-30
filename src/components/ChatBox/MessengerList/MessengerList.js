import React, { useEffect, useState } from 'react'
import "./MessengerList.css"
import avatar from '../../../image/avatar.jpeg'
import apiConfig from '../../../API/configApi';
import axios from 'axios';

function MessengerList({item, currentId,setUserChat}) {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const friendId = item.members.find(f=> f !== currentId)
    const getUser = async () => {
      const data = await axios.get(apiConfig.urlConnect + 'account/user/' + friendId)
      setUser(data.data)
    }
    getUser()
  }, [currentId, item.members])

  return (
    <li className='messenger-friend__container' onClick={()=>setUserChat(user)}>
      <div className='messenger-friend__item'>
        <img src={avatar} alt='' />
        <div className='messenger-friend__content'>
            <span className='messenger-friend__name'>{user?.user_name}</span>
            <span className='messenger-friend__desc'>Hôm nay là thứ 7</span>
        </div>
      </div>
    </li>
  )
}

export default MessengerList