import React, { useEffect, useState } from 'react'
import "./contact.css"
import profile from "../Images/image1.jpg"
import ChatContainer from '../ChatContainer/ChatContainer'
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function  () {
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user;
    let id = user.other._id;
    console.log(id);

    const accesstoken = user.accessToken;
    console.log(accesstoken);
    const [users , setusers] = useState();
    const [currentChatUser , setcurrentChatUser ] = useState('')
    useEffect(() => {
        const getuser = async() => {
          try {
            const res = await axios.get(`http://localhost:5000/api/post/following/${id}`, {
              headers: {
                token: accesstoken
              }
            })
            setusers(res.data);
          } catch (error) {
            
          }
        }
        getuser();
      }, [])
      console.log(users);
      const handleUser = (e)=>{
        console.log(e)
      }
  return (
    <div className='mainContactContainer'>
        <div>
            <div style={{width:"20pc",padding:"10px"}}>
                <input type="search" placeholder='Search your Friends' className='searchbarforcontact'/>
             </div>
            <div className="userDetailContainer">
                {
                users?.map((item)=>{
                <div>
                    { 
                    item?._id !== id ? 
                    <div className="userContainer" onClick={(e)=>handleUser(item)}>
                        <img src={`${item?.profile}`} className="chatuserimage" alt=""/>
                        <div style={{marginLeft:"10px"}}>
                        <p style={{color:"black" , textAlign:"start" , marginTop:"5px" , fontSize:"15px"}}>{item?.username}</p> 
                        <p style={{color:"black" , textAlign:"start" , marginTop:"-16px" , fontSize:"14px"}}>open your message</p>
                        </div>
                    </div> : ""
                    }
                </div>
                    })
                }
            </div>
        </div>
        {currentChatUser !== '' ?
        <ChatContainer currentChatUser={currentChatUser}/> : 
        <div style={{marginLeft:"40px" , marginTop:"10px"}}>
        <p style={{fontSize:"30px" , color:"#876b70"}}>Open Your Message Tab to Chat With Friends</p>
        </div>
        }
     </div>
   )
}
