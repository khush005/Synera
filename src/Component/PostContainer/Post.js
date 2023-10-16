import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./post.css"
import ProfileImage from "../Images/Profile.png"
import likeIcon from "../Images/like.png"
import CommentIcon from "../Images/speech-bubble.png"
import ShareIcon from "../Images/share.png"
import MoreOption from "../Images/more.png"
import anotherLikeIcon from "../Images/setLike.png"
// import { getImageUrl } from '../../utils/util'

export default function Post({post}) {
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const getuser = async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${post.user}`)
                setUser(res.data)
            } catch (error) {
                console.log("Some error occured");
            }
        }
        getuser();
    }, [])
    
    const userId = "6517c2b9e063043f8fbf4d7b"
    const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdjMmI5ZTA2MzA0M2Y4ZmJmNGQ3YiIsInVzZXJuYW1lIjoiS2h1c2hib28iLCJpYXQiOjE2OTcxOTY5MDB9.WFrCIckIhbXs3Ab3KMvav67JSVuaDLKohEwZ9AFvc-Y";
    const [Like, setLike] = useState([post.like.includes(userId) ? anotherLikeIcon : likeIcon])
    const [count, setCount] = useState(post.like.length);
    const [Comments, setComments] = useState([])
    const [commentWriting, setCommentWriting ] = useState("")
    const [show, setShow] = useState(false)
    // console.log(post);

    const handleLike = async() =>{
        if(Like == likeIcon){
            await fetch(`http://localhost:5000/api/post/6518077/${post._id}/like`, {method:"PUT", headers:{'Content-Type':"application/Json", token:accesstoken}})
            setLike(anotherLikeIcon)
            setCount(count+1)
        }
        else {
            await fetch(`http://localhost:5000/api/post/6518077/${post._id}/like`, {method:"PUT", headers:{'Content-Type':"application/Json", token:accesstoken}})
            setLike(likeIcon)
            setCount(count-1)
        }
    }

    const addComment = () =>{
        const comment = {
            "id": "61kmdfg123456789",
            "username": "Khushboo",
            "title": `${commentWriting}`
        }
        setComments(Comments.concat(comment))
    }

    const handleComment = () =>{
        addComment();
    }

    console.log(Comments);

    const handleShow = () =>{
        if(show === false){
            setShow(true)
        }
        else {
            setShow(false)
        }
    }
    console.log(user);

  return (
    <div className='PostContainer'>
        <div className="SubPostContainer">
            <div>
                <div style={{display:'flex', alignItems:'center'}}>
                    {user.profile == ""? <img src={`${ProfileImage}`} className='PostImage' alt="" /> : <img src={`${user.profile}`} className='PostImage' alt="" />}
                    
                    <div>
                        <p style={{marginLeft:'5px', textAlign:'start'}}>{user.username}</p>
                        <p style={{fontSize:'11px', textAlign:'start', marginLeft:5, marginTop:-13, color:'#aaa'}}>Following by Khushboo</p>
                    </div>
                    {/* <p style={{marginLeft:'5px'}}>Khushboo</p> */}
                    <img src={`${MoreOption}`} className='moreicons' alt="" />
                </div>

                
                <p style={{textAlign:'start', width:'90%', marginLeft:10, marginTop:0}}>{post.title}</p>
                <img src={`${post.image}`} className='PostImages' alt={post.user} onError={() => console.log('Image failed to load')}/>
                {/* <li key={post._id}> */}
                {/* <img src={getImageUrl(post)} className='PostImages' alt={post.user} /> */}
                {/* </li> */}

                <div style={{display:'flex'}}>
                    <div style={{display:'flex', marginLeft:"10px"}}>

                        <div style={{display:'flex', alignItems:'center', cursor:'pointer'}}>
                            <img src={`${Like}`} className='iconsforPost' onClick={handleLike} alt="" />
                            <p style={{marginLeft:'6px'}}>{count} Likes</p>
                        </div>

                        <div style={{display:'flex', alignItems:'center', marginLeft:20, cursor:'pointer'}}>
                            <img src={`${CommentIcon}`} className='iconsforPost' onClick={handleShow} alt="" />
                            <p style={{marginLeft:'6px'}}>{post.comments.length} Comments</p>
                        </div>
                    </div>

                    <div style={{display:'flex', alignItems:'center', marginLeft:200, cursor:'pointer'}}>
                        <img src={`${ShareIcon}`} className='iconsforPost' alt="" />
                        <p style={{marginLeft:'6px'}}>Share</p>
                    </div>
                </div>

                {show === true ?
                <div style={{padding:'10px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <img src={`${ProfileImage}`} className='PostImage' alt="" />
                        {/* <p style={{marginLeft:'6px'}}>Khushboo</p> */}
                        <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e)=>setCommentWriting(e.target.value)} />
                        <button className='addCommentbtn' onClick={handleComment}>Post</button>
                    </div>

                    {Comments.map((item)=>(
                        <div style={{alignItems:'center'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <img src={`${ProfileImage}`} className='PostImage' alt="" />
                                <p style={{marginLeft:'6px', fontSize:20, marginTop:6}}>{item.username}</p>
                            </div>
                        <p style={{marginLeft:'55px', textAlign:'start', marginTop:-16}}>{item.title}</p>
                        <p style={{marginLeft:'55px', textAlign:'start', marginTop:-10, color:"#aaa", fontSize:11}}>Reply</p>
                    </div>
                    ))}
                </div> : ''
                }

            </div>
        </div>
    </div>
  )
}
