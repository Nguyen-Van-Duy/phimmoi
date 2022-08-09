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
  currentChat,
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

  const handleClickFriend = async (item, index, notifications, notificationIndex) => {
    console.log(currentChat);
    setCurrentChat(item)
    const newArray = [...userConversation]
    const newNotification = [...item.list_user]
    newNotification[notificationIndex] = {...notifications, notification: 0, in_room: true}
    newArray[index].list_user = newNotification
    const newListUser = []
    item.list_user.map(data=> newListUser.push({...data, in_room: false})) 
    console.log(newListUser);
    await axios.post(apiConfig.urlConnect + 'conversation/change-notification', {id: item._id, new_notification: newListUser} )
    socket.emit("InRoom", {newNotification: newNotification[notificationIndex], id: item._id, currentChat: currentChat})
  }
  
  useEffect(()=> {
    socket.on("GetRoom", (data) => {
      console.log(data);
    })
    // socket.on("GetGroupNotification", (data) => {
    //   console.log(data);
    // })
  }, [socket])
  
  useEffect(()=> {
    console.log(userConversation);
    userConversation && socket && socket.emit("GroupNotification", {userConversation})
  }, [userConversation, socket])
  return (
    <ul className='messenger-friend__list'>
    {/* user */}
      {valueContentMenu === 'user' && userConversation.length > 0 && userConversation.map((item, id) => {
          if(item.members.includes(idAdmin) && dataUser.role === 'user') {
            return []
          }
          const notification = item.list_user.find(user=> user.user_id === dataUser._id)          
          const notificationIndex = item.list_user.findIndex(user=> user.user_id === dataUser._id)
        return (
          <div key={item._id} onClick={() => handleClickFriend(item, id, notification, notificationIndex)}>
            {item && <ListFriend socket={socket} online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu} notification={notification}/>}
        </div>
        )
      })}

    {/* admin */}
      {valueContentMenu === 'admin' && userConversation.length > 0 && userConversation?.map((item, id) => {
        // if(id !== 0) {
        //   return []
        // }
        const notification = item.list_user.find(user=> user.user_id === dataUser._id)        
        const notificationIndex = item.list_user.findIndex(user=> user.user_id === dataUser._id)
        return (
          <div key={item._id} onClick={() => handleClickFriend(item, id, notification, notificationIndex)}>
            {item && <ListFriend socket={socket} online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu}  notification={notification}/>}
        </div>
        )
      })}

      {/* group */}
      {valueContentMenu === 'group' && userConversation.length > 0 && userConversation.map((item, id) => {
        // console.log(item);
        const notification = item.list_user.find(user=> user.user_id === dataUser._id)        
        const notificationIndex = item.list_user.findIndex(user=> user.user_id === dataUser._id)
        return (
          <div key={item._id} onClick={() => handleClickFriend(item, id, notification, notificationIndex)}>
            {item && <ListFriend socket={socket} online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu}  notification={notification}/>}
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