import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./profilemainPost.css"
import CoverImage from "../Images/Profile.png"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../ProfilePostContainer/Post'
import { useLocation } from 'react-router-dom'

export default function ProfileMainPost() {
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () =>{
      try {
        const res = await axios.get(`http://localhost:5000/api/post/get/post/${id}`)
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
