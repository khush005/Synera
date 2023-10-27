import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./post.css"
import ProfileImage from "../Images/Profile.png"
import likeIcon from "../Images/like.png"
import CommentIcon from "../Images/speech-bubble.png"
import ShareIcon from "../Images/share.png"
import MoreOption from "../Images/more.png"
import anotherLikeIcon from "../Images/setLike.png"
import pdfIcon from "../Images/send-folder.png"
import audioIcon from "../Images/audio.png"
import { useSelector } from 'react-redux'

export default function Post({post}) {
    const userDetails = useSelector((state)=>state.user);
    let users = userDetails?.user;
  
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
    
    const userId = users?.other?._id;
    // const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTdjMmI5ZTA2MzA0M2Y4ZmJmNGQ3YiIsInVzZXJuYW1lIjoiS2h1c2hib28iLCJpYXQiOjE2OTcxOTY5MDB9.WFrCIckIhbXs3Ab3KMvav67JSVuaDLKohEwZ9AFvc-Y";
    const accessToken = users?.accessToken;
    const [Like, setLike] = useState([post.like.includes(userId) ? anotherLikeIcon : likeIcon]);
    const [count, setCount] = useState(post.like.length);
    const [Comments, setComments] = useState(post.comments);
    const [commentWriting, setCommentWriting ] = useState('')
    const [show, setShow] = useState(false)
    // console.log(post);

    const handleLike = async() =>{
        if(Like == likeIcon){
            await fetch(`http://localhost:5000/api/post/${post._id}/like`, {method:"PUT", headers:{'Content-Type':"application/Json", token:accessToken}})
            setLike(anotherLikeIcon)
            setCount(count+1)
        }
        else {
            await fetch(`http://localhost:5000/api/post/${post._id}/like`, {method:"PUT", headers:{'Content-Type':"application/Json", token:accessToken}})
            setLike(likeIcon)
            setCount(count-1)
        }
    }

    const addComment = async() =>{
        const comment = {
            "postid": `${post._id}`,
            "username": `${users.other.username}`,
            "comment": `${commentWriting}`,
            "profile": `${users.other?.profile}`
        }
        await fetch(`http://localhost:5000/api/post/comment/post`, {method:"PUT", headers:{'Content-Type':"application/Json", token:accessToken}, body:JSON.stringify(comment)})
        setComments(Comments.concat(comment));
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
                    <img src={`${MoreOption}`} style={{marginLeft:"340px"}} className='moreicons' alt="" />
                </div>

                
                <p style={{textAlign:'start', width:'90%', marginLeft:10, marginTop:0}}>{post.title}</p>
                
                {post.image !== ''?
                <img src={`${post.image}`} className='PostImages' alt='' />: post.video !== '' ? <video className='PostImages' width="500" height="500" controls >
                    <source src={`${post.video}`} type="video/mp4"/>
                </video> : post.pdf !== '' ? (
                        <div>
                            <img src={pdfIcon} className="PostImages" alt="PDF icon" />
                            <a href={post.pdf} target="_blank" rel="noreferrer" style={{marginLeft:"20px"}}>View PDF</a>
                            <iframe src={post.pdf} width="500" height="500" title="PDF document" />
                        </div>
                    ) 
                    // : post.ppt !== '' ? (
                    //     <div>
                    //       {/* Display PPT here (you can use a third-party library or viewer) */}
                    //       <a href={post.ppt} target="_blank" rel="noreferrer" style={{marginLeft:"20px"}}>View PPT</a>
                    //         <iframe src={post.ppt} width="500" height="500" title="PDF document" />
                    //     </div>
                    //   ) : post.word !== '' ? (
                    //     <div>
                    //       {/* Display Word document here (you can use the converted HTML or a viewer) */}
                    //       <a href={post.word} target="_blank" rel="noreferrer" style={{marginLeft:"20px"}}>View Word</a>
                    //         <iframe src={post.word} width="500" height="500" title="PDF document" />
                    //     </div>
                    //   ) 
                      : post.audio !== '' ? (
                        <div>
                            {/* <img src={audioIcon} className="PostImages" alt="Audio icon" /> */}
                            <audio controls>
                                <source src={post.audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ) : '' }

                    

                <div style={{display:'flex'}}>
                    <div style={{display:'flex', marginLeft:"10px"}}>

                        <div style={{display:'flex', alignItems:'center', cursor:'pointer'}}>
                            <img src={`${Like}`} className='iconsforPost' onClick={handleLike} alt="" />
                            <p style={{marginLeft:'6px'}}>{count} Likes</p>
                        </div>

                        <div style={{display:'flex', alignItems:'center', marginLeft:20, cursor:'pointer'}}>
                            <img src={`${CommentIcon}`} className='iconsforPost' onClick={handleShow} alt="" />
                            <p style={{marginLeft:'6px'}}>{Comments.length} Comments</p>
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
                        <img src={`${users.other.profile}`} className='PostImage' alt="" />
                        {/* <p style={{marginLeft:'6px'}}>Khushboo</p> */}
                        <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e)=>setCommentWriting(e.target.value)} />
                        <button className='addCommentbtn' onClick={handleComment}>Post</button>
                    </div>

                    {Comments.map((item)=>(
                        <div style={{alignItems:'center'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                {item.profile === '' ? 
                                    <img src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="PostImage" alt="" /> : <img src={`${item.profile}`} className='PostImage' alt="" />
                                }
                                <p style={{marginLeft:'6px', fontSize:20, marginTop:6}}>{item.username}</p>
                            </div>
                        <p style={{marginLeft:'55px', textAlign:'start', marginTop:-16}}>{item.comment}</p>
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
