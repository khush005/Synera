import React, {useEffect, useState} from 'react'
import "./mainPost.css"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from "../PostContainer/Post"
import axios from 'axios'

export default function MainPost() {
  const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdjMmI5ZTA2MzA0M2Y4ZmJmNGQ3YiIsInVzZXJuYW1lIjoiS2h1c2hib28iLCJpYXQiOjE2OTcxOTY5MDB9.WFrCIckIhbXs3Ab3KMvav67JSVuaDLKohEwZ9AFvc-Y"
  const [post, setPost] = useState([])
  
  useEffect(() => {
    const getPost = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/flw/6517c2b9e063043f8fbf4d7b`, {
          headers: {
            token: accesstoken
          }
        })
        setPost(res.data);
      } catch (error) {
        
      }
    }
    getPost();
  }, [])

  console.log(post);
  

  return (
    <div className='mainPostContainer'>
      <ContentPost/>
      {post.map((item)=>(
        item.map((postdetails)=>(
          <Post post={postdetails} />
        ))
      ))}
      
    </div>
  )
}
