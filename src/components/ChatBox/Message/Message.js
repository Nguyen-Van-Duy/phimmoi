import React, { useState } from 'react'
import {format} from 'timeago.js'
import avatar from '../../../image/avatar.jpeg'
import './Message.css'

export default function Message({own, message}) {
    const [showTime, setShowTime] = useState(false)
    return (
      
      <div className={own ? 'message own': 'message'}>
          <div className="messageTop">
              {!own && <img 
              className='messageImg'
              src={avatar} alt="" />}
              <p className="messageText" onClick={()=>setShowTime(!showTime)}> {message.text}</p>
          </div>
          {showTime && <div className="messageBottom">{format(message.createdAt)}</div>}
      </div>
    )
  }