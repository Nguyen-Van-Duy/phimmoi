import React from 'react'
import ListFriend from './ListFriend/ListFriend';
import MessengerList from './MessengerList/MessengerList';

function ListFeatureChat({
  invitation, 
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
  console.log(userConversation);
  return (
    <ul className='messenger-friend__list'>
    {/* user */}
      {invitation && valueContentMenu === 'user' && userConversation.length > 0 && userConversation?.map((item, id) => {
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
      {invitation && valueContentMenu === 'admin' && userConversation.length > 0 && userConversation?.map((item, id) => {
        console.log(item);
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
      {invitation && valueContentMenu === 'group' && userConversation.length > 0 && userConversation?.map((item, id) => {
        console.log(item);
        
        return (
          <div key={item._id} onClick={() => setCurrentChat(item)}>
            <ListFriend online={userOnline} setUserChat={setUserChat} currentId={userId} item={item} valueContentMenu={valueContentMenu}/>
        </div>
        )
      })}

      {/* message */}
      {valueContentMenu === 'message' && listUser.length > 0 && listUser?.map((item) => (
        <div key={item._id}>
          <MessengerList socket={socket.current} 
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