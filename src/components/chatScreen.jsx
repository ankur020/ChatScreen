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
import { BiGroup, BiArrowBack } from "react-icons/bi";
import { GoReport } from "react-icons/go";
import { TiDocumentText } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import ChatBox from "./ChatBox";
//const ChatBox = lazy(() => import("./ChatBox"));

const ChatScreen = () => {
  const [users, setUsers] = useState(null);
  const [msg, setMsg] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const messagesRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  //let api = "https://3.111.128.67/assignment/chat?page=0";

  function handleScroll() {
    if (messagesRef.current.scrollTop === 0) {
      setPage((prevPage) => prevPage + 1);
    }
  }
  // function handleChats() {
  //   setPage((prevPage) => prevPage + 1);
  //   //fetchUserData();
  // }
  //console.log(users);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://3.111.128.67/assignment/chat?page=${page}`
        );
        const data1 = await res.json();

        setUsers((prevData) => {
          return { ...prevData, ...data1 };
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [page]);

  //console.log(chatData);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  return (
    <div className="container">
      <header>
        <button className="back-arrow">
          <BiArrowBack />
        </button>
        {isLoading ? <h2>Loading...</h2> : <h1>{users && users.name}</h1>}

        <button>
          <FaRegEdit />
        </button>
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
        style={{ height: "60vh", overflowY: "scroll" }}
        onScroll={handleScroll}
        className="chat-box"
      >
        {/* <div>
          <button onClick={handleChats}>Next Page</button>
        </div> */}
        {isLoading ? <h1>Loading...</h1> : <ChatBox props={users} />}
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
