import React, { useEffect, useRef, useState } from 'react';
import "./ChatBox.css"
import "./MessengerList/MessengerList.css"
import avatar from '../../image/avatar.jpeg'
import apiConfig from '../../API/configApi';
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from 'react-redux';
import Message from './Message/Message';
import MenuChatBox from './MenuChatBox/MenuChatBox';
import MessengerList from './MessengerList/MessengerList';

const ChatBox = ({showBoxChat, handleShowBoxChat}) => {
    const [showListFriend, setShowListFriend] = useState(false)
    const [isReceive, setIsReceive] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // null
    const [message, setMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [userConversation, setUserConversation] = useState([]);
    const dataUser = useSelector((state) => state.loginSlice.dataUser);
    const userId = dataUser?.id;
    console.log(dataUser);
    const [isAddFriend, setIsAddFriend] = useState(false);
    const [addNewFriend, setAddNewFriend] = useState(false);
    const [inputStr, setInputStr] = useState("");
    const socket = useRef(); 
    const scrollRef = useRef();
    const token = localStorage.getItem('token')

    // connect socket and get message
    useEffect(() => {
        socket.current = io(apiConfig.urlConnectSocketIO);
        //get message from socket
        if (isReceive === false) {
          socket.current.on("getMessage", (data) => {
            console.log('get data message:', data);
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
        }
        return () => {
            //disconnect 
          console.log('disconnect!');
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
        console.log("user online: ", users);
        });
    }
    return () => {
        setIsAddFriend(true);
    };
    }, [userId, isAddFriend]);

    // add chat room in db
    useEffect(() => {
        const getConversation = async () => {
          const data = await axios.get(
            apiConfig.urlConnect + "conversation/" + userId
          );
          console.log(data.data);
          setUserConversation(data.data);
        };
        getConversation();
      }, [userId, addNewFriend]);
    
    //   get message from db
      useEffect(() => {
        const getMessages = async () => {
          try {
            const data = await axios.get(
              apiConfig.urlConnect + "message/" + currentChat?._id
            );
            console.log(data.data);
            setMessage(data.data);
            console.log("total message: ", data.data);
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
        // console.log(e.target[0].value);
        // console.log({
        //   conversationId: currentChat._id,
        //   sender: userId,
        //   text: inputStr,
        // });
    
        const receiverId = currentChat.members.find((member) => member !== userId);
        console.log(receiverId);
        socket.current.emit("sendMessage", {
          senderId: userId,
          receiverId,
          text: inputStr,
        });
        try {
          const data = await axios.post( apiConfig.urlConnect + "message", {
            conversationId: currentChat._id,
            sender: userId,
            text: inputStr,
          });
          console.log(data);
          setMessage((d) => [
            ...d,
            {
              conversationId: currentChat._id,
              sender: userId,
              text: inputStr,
            },
          ]);
        } catch (error) {
          console.log(error);
        }
      };

    //   add friend db
      const addFriend = async (receiverId) => {
        const result = await axios.post(apiConfig.urlConnect + 'conversation/add-friend',{receiverId, senderId: userId }, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(result);
        if(result.status === 200) {
          setAddNewFriend(!addNewFriend)
          alert("Success")
        }
      }

    //   handle scroll message
      useEffect(() => {
        console.log(scrollRef.current);
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);

    return (
        <div className={!showBoxChat ? 'messenger' : 'messenger show-messenger' }>
            <MenuChatBox setShowListFriend={setShowListFriend} showListFriend={showListFriend} />
            <div className={!showListFriend ? "messenger__list" : 'messenger__list show-messenger__list'}>
              <div className='messenger-list__header'>
                <input type="text" placeholder="Enter your name or email" />
              </div>
              <div className='messenger-list__body'>
                <ul className='messenger-friend__list'>
                  {userConversation.length > 0 && userConversation?.map((item) => (
                    <div key={item._id} onClick={() => setCurrentChat(item)}>
                      <MessengerList currentId={userId} item={item} />
                  </div>
                  ))}
                </ul>
              </div>
            </div>
            <div className="chat-box__containner">
                <div className='chat-box__header'>
                    <div className='message-header__left'>
                        <img src={avatar} alt='' />
                        <div className='message-header__title'>
                            <span className='message-header__name'>Nguyễn Văn Duy</span>
                            <span className='message-header__desc'>Hôm nay là thứ 7</span>
                        </div>
                    </div>
                    <div className='message-header__left' onClick={()=>handleShowBoxChat()}>
                    <i className="fa-solid fa-xmark message-close"></i>
                    </div>
                </div>
                <div className='chat-box__body'>
                  {currentChat ? (
                    <>
                      {message?.map((item, id) => (
                          <div key={id} ref={scrollRef}>
                          <Message own={item.sender === userId} message={item} />
                          </div>
                      ))}
                  </>
                  ) : (<span>Open a conversation to start a chat</span>)}
                </div>
                <div className='chat-box__bottom'>
                    <form onSubmit={handleSendMessage} className="chat-box__form">
                        <i className="fa-solid fa-face-laugh-beam message-icon"></i>
                        <input name="mesage-send" className="chat-box__send" value={inputStr} onChange={(e) => setInputStr(e.target.value)} />
                        {/* <img
                        className="emoji-icon" alt=""
                        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                        onClick={() => setShowPicker((val) => !val)}
                        /> */}
                        
                        {/* {showPicker && <div>
                            <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '70%' }} />
                        </div>} */}
                        <button className="chat-submit-button" type="submit">
                            <i className="fa-solid fa-paper-plane message-icon"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;