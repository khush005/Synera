import React, { useEffect, useRef, useState } from 'react'
import profile from "../Images/image3.jpg"
import "./ChatContainer.css"
import axios from 'axios'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export default function ChatContainer({currentChatUser}) {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id = user.other._id;
  const scrollRef = useRef();
  const socket = useRef();
  const [message, setMessage] = useState([])
  let accesstoken = user.accessToken;
  const [inputmessage, setinputmessage] = useState('');
  const [arrivalMessage, setarrivalMessage] = useState(null);
  
  useEffect(() => {
    const getmessage = async() => {
      try {
        // if(id && accessotken) {
          const res = await axios.get(`http://localhost:5000/api/post/get/chat/msg/${id}/${currentChatUser._id}`, {
            headers: {
              token: accesstoken
              // Authorization: `Bearer ${accessToken}`
            }
          })
          setMessage(res.data);
          // }
        } catch (error) {
          // console.error(error);
        }
      }
      getmessage();
    }, [currentChatUser._id])
    console.log(message);

    useEffect(() => {
      if(currentChatUser !== ''){
        socket.current = io("http://localhost:5000")

        // Add an error event listener
        // socket.current.on('error', (error) => {
        //   console.error('WebSocket connection error:', error);
        // });

        socket.current.emit("addUser", id);
      }
    
    }, [id]);

    // console.log(socket);
    

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[message])

    const sendmsg = () =>{
      const messages = {
        myself: true,
        message: inputmessage
      };

      socket.current.emit("send-msg", {
        to: currentChatUser._id,
        from: id,
        message: inputmessage
      })

      fetch(`http://localhost:5000/api/post/msg`, {method:"POST", headers:{'Content-Type':'application/JSON', token:accesstoken}, body:JSON.stringify({
        from: id,
        to: currentChatUser._id,
        message: inputmessage
      })});
      setMessage(message.concat(messages))
      // setMessage((prevMessages) => [...prevMessages, messages]);
    }

    useEffect(() => {
      if(socket.current){
        socket.current.on("msg-recieve", (msg)=>{
          console.log(msg);
          setarrivalMessage({myself:false, message:msg})
        })
      }
    }, [arrivalMessage]);

    useEffect(() => {
      arrivalMessage && setMessage((pre)=>[...pre, arrivalMessage])
    
    }, [arrivalMessage]);
    
    
  return (
    <div className='MainChatContainer'>
      <div>
        <div style={{display:"flex", marginLeft:"30px", marginTop:"10px", backgroundColor:"rgb(241,243,241)", width:"70pc", padding:"5px", borderRadius:"10px"}}>
          <img src={`${currentChatUser?.profile}`} className='userProfile' alt="" />
          <p style={{marginTop:"10px", marginLeft:"10px"}}>{currentChatUser?.username}</p>
        </div>

        <div className='msgContainer'>
          {message?.map((item, index)=>(
          <div ref={scrollRef} key={item.id || index}>  
            {item?.myself === false ?
          <div className='msg'>
            <img src={`${currentChatUser?.profile}`} className='chatuserprofile' alt="" />
            <p className='msgTxt'>{item?.message}</p>
          </div> : 
          <div style={{display:"flex", alignItems:"center",marginLeft:"30px", backgroundColor:"rgb(241,243,241)", marginTop:"10px", padding:"3px", borderRadius:"10px", width:"40%", marginTop:"10px"}}>
            <p style={{textAlign:"start", marginLeft:"50px"}}>{item?.message}</p>
          </div>
          }
          </div>
          ))}
          
          
        </div>

        <div className='msgSenderContainer'>
          <input type="text" placeholder='Write your message to your friend' onChange={(e) => setinputmessage(e.target.value)} name='' id='' className='msginput' />
          <button className='msgbutton' onClick={sendmsg}>Send</button>
        </div>

      </div>
    </div>
  )
}
