import React, { useEffect, useState } from 'react'
import "./contact.css"
import profile from "../Images/image3.jpg"
import ChatContainer from '../ChatContainer/ChatContainer'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Contact() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user;
  let id = user.other._id;
  let accesstoken = user.accessToken;
  // let id = user ? user._id : '';
  // const accessToken = user ? user.accessToken : '';
  const [users, setusers] = useState();
  const [currentChatUser, setcurrentChatUser] = useState('')
  console.log(id);
  console.log(accesstoken);

  useEffect(() => {
    const getuser = async() => {
      try {
        // if(id && accessotken) {
          const res = await axios.get(`http://localhost:5000/api/post/following/${id}`, {
            headers: {
              token: accesstoken
              // Authorization: `Bearer ${accessToken}`
            }
          })
          setusers(res.data);
        // }
      } catch (error) {
        // console.error(error);
      }
    }
    getuser();
  }, [])
  // console.log(users);

  const handleUser = (item) =>{
    // console.log(item);
    setcurrentChatUser(item);
  }
  

  return (
    <div className='mainContactContainer' >
      <div>
        <div style={{width:"20pc", padding:"20px"}}>
          <input type="search" placeholder='Search your friends' className='searchbarforcontact'/>
        </div>

      <div className='userDetailContainer'>
        {users?.map((item)=>(
        <div key={item._id}>
          {item?._id !== id ? (
        <div className='userContainer' onClick={() => handleUser(item)}>
          <img src={`${item.profile}`} className='chatuserimage' alt="" />
          <div style={{marginLeft:"10px"}}>
            <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>{item.username}</p>
            <p style={{color:"black", textAlign:"start", marginTop:"-16px", fontSize:"14px"}}>Open your message</p>
          </div>
        </div> ) : ""
          
        }
          </div>
        ))}

        
      </div>
      </div>

      {currentChatUser !== '' ? 
      <ChatContainer currentChatUser={currentChatUser}/>:<div style={{marginLeft:"40px", marginTop:"10px"}}>
        <p style={{fontSize:"30px", color:"#876b70"}}>Open your Message tab to chat with your friends</p>
        </div>  
    }
    </div>
  )
}
