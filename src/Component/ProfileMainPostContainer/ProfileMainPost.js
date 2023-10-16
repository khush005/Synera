import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./profilemainPost.css"
import CoverImage from "../Images/Profile.png"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../ProfilePostContainer/Post'

export default function ProfileMainPost() {
  const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdjMmI5ZTA2MzA0M2Y4ZmJmNGQ3YiIsInVzZXJuYW1lIjoiS2h1c2hib28iLCJpYXQiOjE2OTcxOTY5MDB9.WFrCIckIhbXs3Ab3KMvav67JSVuaDLKohEwZ9AFvc-Y";
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () =>{
      try {
        const res = await axios.get(`http://localhost:5000/api/post/get/post/6517c2b9e063043f8fbf4d7b`)
        setPost(res.data)
      } catch (error) {
        console.log("Error occured");
      }
    }
    getPost();
  }, [])
  

  return (
    <div className='ProfilemainPostContainer'>
      <div>
        <img src={`${CoverImage}`} className='profileCoverimage' alt="" />
        <h2 style={{marginTop:-43, color:'white', textAlign:'start', marginLeft:"34px"}}>Your profile</h2>
      </div>
      <ContentPost/>
      {post.map((item)=>(
        <Post detail={item} />
      ))}
    </div>
  )
}
