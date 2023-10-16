import React, { useEffect, useState } from 'react'
import "./rightbar.css"
import ads from "../Images/ads.jpg"
import image1 from "../Images/image1.jpg"

import axios from 'axios'
import Follow from './Follow'

export default function Rightbar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getuser = async()=>{
        try {
            const res = await axios.get(`http://localhost:5000/api/user/all/user/6517c2b9e063043f8fbf4d7b`)
            setUsers(res.data)
        } catch (error) {
            console.log("Some error occured");
        }
    }
    getuser();
}, [])

console.log(users);
  return (
    <div className='Rightbar'>
        <div className="Rightcontainer">
            <div className='adsContainer'>
                <img src={`${ads}`} className='adsimg' alt="" />
                <div>
                    <p style={{textAlign:'start', marginLeft:'10px', marginTop:-20}}>CodeDemy</p>
                    <p style={{textAlign:'start', marginLeft:'10px', fontSize:"12px", marginTop:"-16px"}}>Buy codemy course</p>
                </div>
            </div>
            <div className='adsContainer'>
                <img src={`${image1}`} className='adsimg' alt="" />
                <div>
                    <p style={{textAlign:'start', marginLeft:'10px', marginTop:-20}}>CodeDemy</p>
                    <p style={{textAlign:'start', marginLeft:'10px', fontSize:"12px", marginTop:"-16px"}}>Buy codemy course</p>
                </div>
            </div>
            
        </div>

        <div className="Rightcontainer2">
          <h3 style={{textAlign:'start', marginLeft:'10px'}}>Suggested for you</h3>
          {users.map((item)=>(
            <Follow userdetails={item} />
          ))} 
        </div>
    </div>
  )
}
