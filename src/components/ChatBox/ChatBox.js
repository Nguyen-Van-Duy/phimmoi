import React, { useEffect, useRef, useState } from 'react';
import "./ChatBox.css"
import "./MessengerList/MessengerList.css"
import avatar from '../../image/avatar.jpeg'
import img403 from '../../image/403.svg'
import apiConfig from '../../API/configApi';
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from 'react-redux';
import Message from './Message/Message';
import MenuChatBox from './MenuChatBox/MenuChatBox';
import Picker from "emoji-picker-react";
import ListFetureFriend from './ListFeatureFriend/ListFetureFriend';
import ListFeatureChat from './ListFeatureChat';

let showAvatar = false

const ChatBox = ({showBoxChat, handleShowBoxChat}) => {
    const [showListFriend, setShowListFriend] = useState(false)
    const [isReceive, setIsReceive] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // null
    const [message, setMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [userConversation, setUserConversation] = useState([]);
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const isLogin = useSelector((state) => state.loginSlice.isLogin);
    const userId = dataUser?._id;
    const [isAddFriend, setIsAddFriend] = useState(false);
    const [inputStr, setInputStr] = useState("");
    const socket = useRef(); 
    const scrollRef = useRef();
    // const token = localStorage.getItem('token')
    const [showPicker, setShowPicker] = useState(false);
    const [userChat, setUserChat] = useState("");
    const [valueContentMenu, setValueContentMenu] = useState("menu")
    const [listUser, setListUser] = useState(null)
    const [invitation, setInvitation] = useState()
    const [userOnline, setUserOnline] = useState([])
    const [idAdmin, setIdAdmin] = useState()

    const onEmojiClick = (event, emojiObject) => {
      setInputStr((prevInput) => prevInput + emojiObject.emoji);
      setShowPicker(false);
    };

    // connect socket and get message
    useEffect(() => {
        // if(isLogin) {
          socket.current = io(apiConfig.urlConnectSocketIO);
        // }
        //get message from socket
        if (isReceive === false) {
          socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });

        }
        return () => {
            //disconnect 
          // console.log('disconnect!');
          setIsReceive(true);
        };
    }, [isReceive]);

    //Check the chat room, add new messages
    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessage((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

      // add user in chat room
    useEffect(() => {
    if (userId !== null) {
        socket.current.emit("addUser", userId);
    }
    if(isAddFriend === false) {
        socket.current.on("getUsers", (users) => {
          setUserOnline(users)
        });
    }
    return () => {
        setIsAddFriend(true);
    };
    }, [userId, isAddFriend]);

    // add chat room in db
    useEffect(() => {
        const getConversation = async () => {
          let data
          if(valueContentMenu !== "group") {
            data = await axios.get(apiConfig.urlConnect + "conversation/" + userId);
          } else {
            data = await axios.get(apiConfig.urlConnect + "conversation/group/" + userId);
          }
          console.log(data.data);
          setUserConversation(data.data);
          console.log(data.data);
          const dataAdmin = await axios.get(apiConfig.urlConnect + 'account/admin')
          setIdAdmin(dataAdmin.data[0]._id)
          const listFriend = [userId]
          data.data.map((item)=> {
            return listFriend.push(item.members.find(item=> item !== userId))
          })

          const dataListUser = await axios.get(apiConfig.urlConnect + 'account/user')
          const listUserOthers = dataListUser.data.filter(item=>!listFriend.includes(item._id))
          setListUser(listUserOthers)
          
        };
        if(userId) {
          getConversation();
        }
      }, [userId, valueContentMenu]);
    
    //   get message from db
      useEffect(() => {
        const getMessages = async () => {
          try {
            const data = await axios.get(
              apiConfig.urlConnect + "message/" + currentChat?._id
            );
            setMessage(data.data);
          } catch (error) {
            console.log(error);
          }
        };
        if(currentChat !== null) {
          getMessages();
        }
      }, [currentChat]);

    //   handle send message
      const handleSendMessage = async (e) => {
        e.preventDefault();
    
        const receiverId = currentChat.members.find((member) => member !== userId);
        socket.current.emit("sendMessage", {
          senderId: userId,
          receiverId,
          text: inputStr,
        });
        try {
          await axios.post( apiConfig.urlConnect + "message", {
            conversationId: currentChat._id,
            sender: userId,
            text: inputStr,
          });
          setMessage((d) => [
            ...d,
            {
              conversationId: currentChat._id,
              sender: userId,
              text: inputStr,
            },
          ]);
          setInputStr("")
        } catch (error) {
          console.log(error);
        }
      };

    //   handle scroll message
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);

      useEffect(() => {
        if(!isLogin) {
          setMessage(null)
          setValueContentMenu("menu")
          setShowListFriend()
        }
      }, [isLogin, handleShowBoxChat]);

      useEffect(()=>{
        const getInvitation = async () => {
          const result = await axios.get(apiConfig.urlConnect + 'message/invitation/' + userId )
          setInvitation(result.data)
        }
        getInvitation()
      }, [userId, valueContentMenu])

      const handleAddFriendClient = (receiver_id) => {
        const dataListUserAfterAdd = listUser.filter(user=>user._id !== receiver_id)
        setListUser(dataListUserAfterAdd)
      }



    return (<>
        {isLogin ? <div className={!showBoxChat ? 'messenger' : 'messenger show-messenger' }>
            <MenuChatBox setShowListFriend={setShowListFriend} showListFriend={showListFriend} setValueContentMenu={setValueContentMenu} />
            <div className={!showListFriend ? "messenger__list" : 'messenger__list show-messenger__list'}>
              <div className='messenger-list__header'>
                <input type="text" placeholder="Enter your name or email" />
              </div>
              <div className='messenger-list__body'>
                  {isLogin && <ListFeatureChat 
                    socket={socket.current} 
                    invitation={invitation} 
                    handleAddFriendClient={handleAddFriendClient}
                    valueContentMenu={valueContentMenu} 
                    userConversation={userConversation} 
                    idAdmin={idAdmin} dataUser={dataUser} 
                    setCurrentChat={setCurrentChat} 
                    userOnline={userOnline} 
                    setUserChat={setUserChat} 
                    userId={userId} 
                    listUser={listUser}  
                  />}
              </div>
            </div>

            <div className="chat-box__containner">
                <div className='chat-box__header'>
                    <div className='message-header__left'>
                        <img src={avatar} alt='' />
                        <div className='message-header__title'>
                            <span className='message-header__name'>
                              {userChat.room_name|| userChat.user_name || "Box Chat"}
                              {userChat.user_name && <i className="fa-solid fa-caret-down"></i>}
                              {userChat.user_name && 
                              <ListFetureFriend userChat={userChat} idAdmin={idAdmin} setMessage={setMessage} setCurrentChat={setCurrentChat} setUserChat={setUserChat}
                              userConversation={userConversation} setUserConversation={setUserConversation} />}
                            </span>
                            <span className='message-header__desc'></span>
                        </div>
                    </div>
                    <div className='message-header__left' onClick={()=>handleShowBoxChat()}>
                    <i className="fa-solid fa-xmark message-close"></i>
                    </div>
                </div>
                <div className='chat-box__body'>
                  {currentChat ? (
                    <>
                      {message?.map((item, id) => {
                        if(item.sender !== userId && showAvatar === false) {
                          showAvatar = true
                        } else if(item.sender !== userId && showAvatar === true) {
                          showAvatar = null
                        } else if(item.sender === userId) {
                          showAvatar = false
                        }
                        return (
                          <div key={id} ref={scrollRef}>
                          <Message own={item.sender === userId} message={item} showAvatar={showAvatar} />
                          </div>
                      )
                      })}
                  </>
                  ) : (<span>Open a conversation to start a chat</span>)}
                </div>
                {currentChat && <div className='chat-box__bottom'>
                    <form onSubmit={handleSendMessage} className="chat-box__form">
                        <i className="fa-solid fa-face-laugh-beam message-icon"  onClick={() => setShowPicker((val) => !val)}></i>
                        <input name="mesage-send" className="chat-box__send" value={inputStr} onChange={(e) => setInputStr(e.target.value)} />
                        
                        {showPicker && <div className='emoji-icon'>
                            <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '33rem' }} />
                        </div>}
                        <button className="chat-submit-button" type="submit">
                            <i className="fa-solid fa-paper-plane message-icon"></i>
                        </button>
                    </form>
                </div>}
            </div>
        </div> : <div className={`messenger messenger-information ${showBoxChat && 'show-messenger'}`}>
          <img src={img403} alt="" />
          <span>You need to be logged in to perform this function!</span>
          </div>}
        </>
    );
};

export default ChatBox;