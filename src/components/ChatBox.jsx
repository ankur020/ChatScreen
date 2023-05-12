import React from 'react'
import {GoVerified } from "react-icons/go";


const ChatBox = ({props}) => {
  return (
    <div>
      <div>
          {props && (
            <ul>
              <div className="time">
                {props && (
                  <li className="li-time">
                    <span>{props.chats[0].time.toString().slice(0, 10)}</span>
                  </li>
                )}
              </div>
              {props.chats.map((item) => (
                <div className="chatbox">
                  {/* <div className="time">
                    <li key={item.id} className="li-time">
                      <span>{item.time.toString().slice(0, 10)}</span>
                    </li>
                  </div> */}

                  <div className={item.sender.self.toString()}>
                    <div className="img-verify">
                      <span>
                        <img src={item.sender.image} alt="" className="imgg" />
                      </span>
                      {!item.sender.self && item.sender.is_kyc_verified && (
                        <span className="verify">
                          <GoVerified />
                        </span>
                      )}
                    </div>
                    <div className="msg">
                      <span>{item.message}</span>
                      <span className="only-time">
                        {item.time.toString().slice(11, 16)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
    </div>
  )
}

export default ChatBox
