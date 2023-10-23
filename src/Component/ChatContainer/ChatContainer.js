import React, { useEffect, useRef, useState } from 'react';
import './ChatContainer.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export default function ChatContainer({ currentChatUser }) {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  const id = user.other._id;
  const scrollRef = useRef();
  const socket = useRef();

  const [message, setMessage] = useState([]);
  const accessToken = user.accessToken;
  const [inputMessage, setInputMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/get/chat/msg/${id}/${currentChatUser._id}`, {
          headers: {
            token: accessToken,
          },
        });
        setMessage(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentChatUser) {
      getMessages();
    }
  }, [currentChatUser]);

  useEffect(() => {
    if (currentChatUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", id);
    }
  }, [id, currentChatUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendMsg = () => {
    const newMessage = {
      myself: true,
      message: inputMessage,
    };
    socket.current.emit("send-msg", {
      to: currentChatUser._id,
      from: id,
      message: inputMessage,
    });

    fetch('http://localhost:5000/api/post/msg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
      body: JSON.stringify({
        from: id,
        to: currentChatUser._id,
        message: inputMessage,
      }),
    });

    setMessage((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessage((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  return (
    <div className="MainChatContainer">
      <div>
        {currentChatUser && (
          <div style={{ display: "flex", marginLeft: "30px", marginTop: "10px", backgroundColor: "rgb(241 243 241)", width: "70px", padding: "5px", borderRadius: "10px" }}>
            <img src={currentChatUser.profile} className="userProfile" alt="" />
            <p style={{ marginTop: "10px", marginLeft: "10px" }}>{currentChatUser.username}</p>
          </div>
        )}
        <div className="msgContainer">
          {message.map((item, index) => (
            <div key={index} ref={index === message.length - 1 ? scrollRef : null}>
              {item.myself === false ? (
                <div className="msg">
                  <img src={currentChatUser.profile} className="chatuserprofile" alt="" />
                  <p className="msgTxt">{item.message}</p>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", marginLeft: "30px", marginTop: "10px", backgroundColor: "rgb(241 243 241)", width: "40%", padding: "3px", borderRadius: "10px" }}>
                  <p style={{ textAlign: "start", marginLeft: "10px" }}>{item.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="msgSenderContainer">
          <input type="text" placeholder="Type a message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} name="" id="" className="msginput" />
          <button className="msgbutton" onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
