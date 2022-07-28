import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiConfig from '../../API/configApi';
import ListFriend from './ListFriend/ListFriend';
import MessengerList from './MessengerList/MessengerList';

function ListFeatureChat({
  socket, 
  handleAddFriendClient,
  valueContentMenu, 
  userConversation, 
  idAdmin, 
  dataUser, 
  setCurrentChat, 
  userOnline, 
  setUserChat, 
  userId, 
  listUser
}) {
  const [invitation, setInvitation] = useState()

  useEffect(()=>{
    const getInvitation = async () => {
      const result = await axios.get(apiConfig.urlConnect + 'message/invitation/' + userId )
      setInvitation(result.data)
    }
    if(valueContentMenu !== "menu") {
      getInvitation()
    }
  }, [userId, valueContentMenu])

  return (
    <ul className='messenger-friend__list'>
    {/* user */}
      {valueContentMenu === 'user' && userConversation.length > 0 && userConversation?.map((item, id) => {
          if(item.members.includes(idAdmin) && dataUser.role === 'user') {
            return []
          }
        return (
          <div key={item._id} onClick={() => setCurrentChat(item)}>
            <ListFriend online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu}/>
        </div>
        )
      })}

    {/* admin */}
      {valueContentMenu === 'admin' && userConversation.length > 0 && userConversation?.map((item, id) => {
        // if(id !== 0) {
        //   return []
        // }
        return (
          <div key={item._id} onClick={() => setCurrentChat(item)}>
            <ListFriend online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu}/>
        </div>
        )
      })}

      {/* group */}
      {valueContentMenu === 'group' && userConversation.length > 0 && userConversation?.map((item, id) => {
        // console.log(item);
        
        return (
          <div key={item._id} onClick={() => setCurrentChat(item)}>
            <ListFriend online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu}/>
        </div>
        )
      })}

      {/* message */}
      {valueContentMenu === 'message' && listUser.length > 0 && listUser?.map((item) => (
        <div key={item._id}>
          <MessengerList socket={socket} 
          online={userOnline.some(user=>user.userId === item._id)} 
          setUserChat={setUserChat} 
          currentId={userId} 
          item={item} 
          valueContentMenu={valueContentMenu} 
          listInvitation={invitation} 
          handleAddFriendClient={handleAddFriendClient}  />
      </div>
      ))}
    </ul>
  )
}

export default ListFeatureChat