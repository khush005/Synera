import React, { useEffect, useState } from 'react'
import "./rightbar.css"
import ads from "../Images/ads.jpg"
import image1 from "../Images/image1.jpg"

import axios from 'axios'
import Follow from './Follow'
import { useSelector } from 'react-redux'

export default function Rightbar() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user;
  const id = user?.other?._id;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getuser = async()=>{
        try {
            const res = await axios.get(`http://localhost:5000/api/user/all/user/${id}`)
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
            {/* <div className='adsContainer'>
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
            </div> */}

            <div>
      <input
        type="text"
        placeholder="Poll question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {choices.map((choice, index) => (
        <input
          type="text"
          placeholder={`Choice ${index + 1}`}
          value={choice}
          onChange={(e) => handleChoiceChange(index, e.target.value)}
          key={index}
        />
      ))}
      <button onClick={addChoice}>Add Choice</button>
      <button onClick={handleCreatePoll}>Create Poll</button>
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
