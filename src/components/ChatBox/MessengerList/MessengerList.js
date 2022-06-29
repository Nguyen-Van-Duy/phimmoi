import React from 'react'
import "./MessengerList.css"
import avatar from '../../../image/avatar.jpeg'

function MessengerList({showListFriend}) {
  return (
    <div className={!showListFriend ? "messenger__list" : 'messenger__list show-messenger__list'}>
      <div className='messenger-list__header'>
        <input type="text" placeholder="Enter your name or email" />
      </div>
      <div className='messenger-list__body'>
        <ul className='messenger-friend__list'>
          <li className='messenger-friend__container'>
            <div className='messenger-friend__item'>
              <img src={avatar} alt='' />
              <div className='messenger-friend__content'>
                  <span className='messenger-friend__name'>Nguyễn Văn Duy</span>
                  <span className='messenger-friend__desc'>Hôm nay là thứ 7</span>
              </div>
            </div>
          </li>
          <li className='messenger-friend__container'>
            <div className='messenger-friend__item'>
              <img src={avatar} alt='' />
              <div className='messenger-friend__content'>
                  <span className='messenger-friend__name'>Nguyễn Văn Duy</span>
                  <span className='messenger-friend__desc'>Hôm nay là thứ 7</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MessengerList