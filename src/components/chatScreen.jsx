import React from "react";
import { useEffect, useState, useRef } from "react";
import "./chatscreen.css";
import { GrAttachment } from "react-icons/gr";
import {
  BsSend,
  BsThreeDotsVertical,
  BsTelephone,
  BsCamera,
  BsCameraVideo,
} from "react-icons/bs";
import { BiGroup } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
//import ChatBox from "./ChatBox";

const ChatScreen = () => {
  const [users, setUsers] = useState(null);
  const [msg, setMsg] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const messagesRef = useRef(null);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  //let api = "https://3.111.128.67/assignment/chat?page=0";

  

  // function handleScroll() {
  //   if (messagesRef.current.scrollTop === 0) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }
  function handleChats() {
    setPage((prevPage) => prevPage + 1);
    //fetchUserData();
  }
  //console.log(users);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://3.111.128.67/assignment/chat?page=${page}`
        );
        const data1 = await res.json();
        const data2 = data1 && data1.chats;
        console.log(data2);
        //console.log(data);
        setUsers((prevData) => {
          return { ...prevData, ...data1 };
        });
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [page]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  return (
    <div className="container">
      <header>
        <h1>{users && users.name}</h1>
      </header>
      <div className="head">
        <div className="chat-img">
          <img src={users && users.chats[0].sender.image} alt="" />
        </div>
        <div className="from-to">
          <div>
            <span className="from">From </span>
            <span className="from-name">{users && users.from}</span>
          </div>
          <div>
            <span className="to">To </span>
            <span className="to-name">{users && users.to}</span>
          </div>
        </div>
        <div className="dots">
          <button className="three-dot" onClick={() => setOpenMenu(!openMenu)}>
            <BsThreeDotsVertical />
          </button>
          {openMenu && (
            <div className="dropdown">
              <ul>
                <li>
                  <BiGroup /> Members
                </li>
                <hr />
                <li>
                  <BsTelephone /> Share Numbers
                </li>
                <hr />
                <li>
                  <GoReport /> Report
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        ref={messagesRef}
        style={{ height: "65vh", overflowY: "scroll" }}
        //onScroll={handleScroll}
        className="chat-box"
      >
        <div>
          <button onClick={handleChats}>Next Page</button>
        </div>
        <div>
          {users && (
            <ul>
              {users.chats.map((item) => (
                <div className="chatbox">
                  <div className="time">
                    <li key={item.id} className="li-time">
                      <span>{item.time.toString().slice(0, 10)}</span>
                    </li>
                  </div>
                  <div className={item.sender.self.toString()}>
                    <div>
                      <img src={item.sender.image} alt="" className="imgg" />
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

      <div className="input-box">
        <form action="">
          <input type="text" value={msg} onChange={handleChange} />
          <div className="dropup">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              <GrAttachment />
            </button>
            {open && (
              <div className="attach">
                <ul>
                  <button>
                    <BsCamera />
                  </button>
                  <button>
                    <BsCameraVideo />
                  </button>
                  <button>
                    <TiDocumentText />
                  </button>
                </ul>
              </div>
            )}
          </div>
          <button>
            <BsSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
