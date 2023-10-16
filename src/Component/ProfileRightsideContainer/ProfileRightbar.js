import React, { useEffect, useState } from 'react'
import "./profilerightbar.css"
import axios from 'axios'
import Follow from '../RightsideContainer/Follow'
import { useSelector } from 'react-redux';

export default function ProfileRightbar() {
  const [Followinguser, setFollowinguser] = useState([]);
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  console.log(user);
  let id = user?.other?._id;
  console.log(id);

    useEffect(() => {
        const getFollowing = async() =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/post/followers/${id}`);
                setFollowinguser(res.data)
            } catch (error) {
                console.log("Error");
            }
        }
        getFollowing();
    }, [])
    console.log(Followinguser);

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
    <div className='ProfileRightbar'>
        <div className="ProfileRightcontainer">
            <h3>Followers</h3>
            <div>
              {Followinguser.map((item)=>(
              <div style={{marginTop:"10px"}}>
                <div style={{display:'flex', alignItems:'center', marginLeft:10, cursor:'pointer'}}>
                  <img src={`${item.profile}`} className='Friendsimage' alt="" />
                  <p style={{textAlign:'start', marginLeft:"10px"}}>{item.username}</p>
                </div>
              </div>
              ))}

              
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
