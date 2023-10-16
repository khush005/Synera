import React,{useEffect, useState} from 'react'
import axios from 'axios'
import "./leftbar.css"
import image from "../Images/Profile.png"
import image1 from "../Images/image1.jpg"
import image2 from "../Images/image2.jpg"
import image3 from "../Images/image3.jpg"
import image4 from "../Images/image4.jpg"
import image5 from "../Images/image5.jpg"
import image6 from "../Images/image6.jpg"
import { useSelector } from 'react-redux'


export default function Leftbar() {
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user;
    console.log(user);
    let id = user?.other?._id;

    const accesstoken = user.accessToken;
    console.log(accesstoken);
    const [post , setPost] = useState([]);

  useEffect(() => {
    const getPost = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/flw/${id}`, {
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
    <div className='Leftbar'>
        <div className='NotificationsContainer'>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <p style={{marginLeft:"-14px"}}>Notifications</p>
                <p style={{color: '#aaa', marginLeft:"40px"}}>See all</p>
            </div>

            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Samridhi liked your post</p>
                <img src={`${image}`} className='likeimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image3}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Gabriel started following you</p>
                <img src={`${image1}`} className='followinguserimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image4}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Emily liked your post</p>
                <img src={`${image2}`} className='likeimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image6}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Camille started following you</p>
                <img src={`${image3}`} className='followinguserimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image3}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Elios started following you</p>
                <img src={`${image4}`} className='followinguserimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image2}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Gabriel liked your post</p>
                <img src={`${image5}`} className='likeimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image1}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>John liked your post</p>
                <img src={`${image6}`} className='likeimage' alt="" />
            </div>
            <div style={{display:'flex', alignItems:"center", marginTop:-10}}>
                <img src={`${image5}`} className='notificationimg' alt="" />
                <p style={{marginLeft: '5px', color: "#aaa", fontSize:13, textAlign:"start", width:"120px"}}>Mindy liked your post</p>
                <img src={`${image2}`} className='likeimage' alt="" />
            </div>
        </div>


        <div className='NotificationsContainer'>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <p style={{marginLeft:"-20px"}}>Explore</p>
                <p style={{color: '#aaa', marginLeft: "40px"}}>See all</p>
            </div>

            <div>
                {post.map((item)=>(
                    item.map((image)=>(
                        <img src={`${image.image}`} className='exploreimage' alt="" />
                    ))
                ))}
                
            </div>
        </div>
    </div>
  )
}
