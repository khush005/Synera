import React, { useEffect, useState } from 'react'
import "./profileleftbar.css"
import image from "../Images/Profile.png"
import axios from 'axios'
import { useSelector } from 'react-redux';

export default function ProfileLeftbar() {
    const userDetails = useSelector((state)=>state.user);
    let user = userDetails.user;
    console.log(user);
    const id = user.other._id;
    let username = user.other.username;
    let followersCounter = user.other.Followers.length;
    let followingCounter = user.other.Following.length;
  
    const [Followinguser, setFollowinguser] = useState([]); 

    useEffect(() => {
        const getFollowing = async() =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/post/following/${id}`);
                setFollowinguser(res.data)
            } catch (error) {
                console.log("Error");
            }
        }
        getFollowing();
    }, [])
    console.log(Followinguser);

  return (
    <div className='ProfileLeftbar'>
        <div className='NotificationsContainer'>
            <img src={`${image}`} className='ProfilePageCover' alt="" />
            <div style={{display:'flex', alignItems:'center', marginTop:-30}}>
                <img src={`${user.other.profile}`} className='ProfilePageImage' alt="" />
                <div>
                    <p style={{marginLeft:6, marginTop:20, color:'black', textAlign:'start'}}>{username}</p>
                    <p style={{marginLeft:6, marginTop:20, color:'black', textAlign:'start', marginTop:-16, fontSize:11 }}>Software Developer</p>
                </div>
            </div>

            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p style={{color:'black', marginLeft:20, fontSize:'14px'}}>Followings</p>
                <p style={{color:'black', marginRight:20, fontSize:'12px', marginTop:17}}>{followingCounter}</p>
            </div>

            <div style={{display:'flex', justifyContent:'space-between',  marginTop:-20}}>
                <p style={{color:'black', marginLeft:20, fontSize:'14px'}}>Followers</p>
                <p style={{color:'black', marginRight:20, fontSize:'12px', marginTop:17}}>{followersCounter}</p>
            </div>

            <div style={{marginTop:-20}}>
                <h5 style={{color:'black', marginLeft:10, fontSize:'14px', marginRight:30, marginTop:30, textAlign:'start' }}>User Bio</h5>
                <p style={{color:'black', fontSize:'12px', marginTop:-20, textAlign:'start', marginLeft:'10px'}}>I would rather be despised of who I am, rather than loved by who I am not.</p>
            </div>
            <button style={{width:"100%", paddingTop:7, paddingBottom:7, border:'none', backgroundColor:'green', color:'white'}}>Edit Bio</button>
        </div>


        <div className='NotificationsContainer'>
            <h3>Followings</h3>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p style={{marginLeft:10}}>Friends</p>
                <p style={{marginRight:10, color:'#aaa'}}>See all</p>
            </div>

            <div style={{display:'flex', flexWrap:'wrap', marginLeft:5}}>
                {Followinguser.map((item)=>(
                    <div style={{marginLeft:4, cursor:"pointer"}}>
                        <img src={`${item.profile}`} className='friendimage' alt="" key={item._id}/>
                        <p style={{marginTop:-2}}>{item.username}</p>
                    </div>
                ))}

                
            </div>
        </div>
    </div>
  )
}
