import React, { useState } from 'react'
import image1 from "../Images/image1.jpg"
import image2 from "../Images/image2.jpg"
import image3 from "../Images/image3.jpg"
import image4 from "../Images/image4.jpg"
import image5 from "../Images/image5.jpg"
import image6 from "../Images/image6.jpg"
import addFriends from "../Images/add-user.png"
import UserToFollow from "../Images/afterFollowImg.png"
import { useSelector } from 'react-redux'

export default function Follow({userdetails}) {
    const [Follow, setFollow] = useState(addFriends);
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails?.user
    console.log(user);
    let id = user?.other?._id;
    console.log(id);  

    const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdjMmI5ZTA2MzA0M2Y4ZmJmNGQ3YiIsInVzZXJuYW1lIjoiS2h1c2hib28iLCJpYXQiOjE2OTcxOTY5MDB9.WFrCIckIhbXs3Ab3KMvav67JSVuaDLKohEwZ9AFvc-Y"
    const handleFollow = async(e) => {
        // console.log(e);
        await fetch(`http://localhost:5000/api/user/following/${userdetails._id}`, {method: 'PUT', headers: {'Content-Type':"application/JSON", token: accesstoken }, body:JSON.stringify({user:`${id}`})})
        setFollow(UserToFollow)
    }

  return (
    <div style={{marginTop:"-10px"}} key={userdetails._id} >
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <img src={`${userdetails.profile}`} className='Profileimage' alt="" />
        <div>
          <p style={{marginLeft: "10px", textAlign:'start'}}>{userdetails.username}</p>
          <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Suggested for you</p>
        </div>
      </div>

      <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}} onClick={e => handleFollow(userdetails._id)}>
        <img src={`${Follow}`} className='addfriend' alt="" />
      </div>
    </div>
    </div>
  )
}
