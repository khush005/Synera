import React, {useEffect, useState} from 'react'
import "./mainPost.css"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from "../PostContainer/Post"
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function MainPost() {
  const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user
    console.log(user);
    let id = user?.other?._id;
    // const dispatch = useDispatch();

    const accessToken = user?.accessToken;
    console.log(accessToken);
  // const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdjMmI5ZTA2MzA0M2Y4ZmJmNGQ3YiIsInVzZXJuYW1lIjoiS2h1c2hib28iLCJpYXQiOjE2OTcxOTY5MDB9.WFrCIckIhbXs3Ab3KMvav67JSVuaDLKohEwZ9AFvc-Y"
  const [post, setPost] = useState([])
  
  useEffect(() => {
    const getPost = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/flw/${id}`, {
          headers: {
            token: accessToken
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
        <Post post={item} />
      ))}
      
    </div>
  )
}
