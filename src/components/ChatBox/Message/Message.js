import React, { useState } from 'react'
import {format} from 'timeago.js'
import avatar from '../../../image/avatar.jpeg'
import './Message.css'

export default function Message({own, message, showAvatar}) {
    const [showTime, setShowTime] = useState(false)
    return (
      
      <div className={own ? 'message own': 'message'}>
          <div className="messageTop">
              {!own && showAvatar ? <img 
              className='messageImg'
              src={avatar} alt="" /> : <span className='image-chat'></span>}
              <p className={!own ? "messageText" : "messageText parker"} onClick={()=>setShowTime(!showTime)}> {message.text}</p>
          </div>
          {showTime && <div className="messageBottom">{format(message.createdAt)}</div>}
      </div>
    )
  }