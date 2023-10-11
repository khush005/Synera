import React from 'react'
import "./profilerightbar.css"
import ads from "../Images/ads.jpg"
import image1 from "../Images/image1.jpg"
import image2 from "../Images/image2.jpg"
import image3 from "../Images/image3.jpg"
import image4 from "../Images/image4.jpg"
import image5 from "../Images/image5.jpg"
import image6 from "../Images/image6.jpg"
import addFriends from "../Images/add-user.png"

export default function ProfileRightbar() {
  return (
    <div className='ProfileRightbar'>
        <div className="ProfileRightcontainer">
            <h3>Followers</h3>
            <div>
              <div style={{marginTop:"10px"}}>
                <div style={{display:'flex', alignItems:'center', marginLeft:10, cursor:'pointer'}}>
                  <img src={`${image2}`} className='Friendsimage' alt="" />
                  <p style={{textAlign:'start', marginLeft:"10px"}}>Samridhi </p>
                </div>
              </div>

              <div style={{marginTop:"10px"}}>
                <div style={{display:'flex', alignItems:'center', marginLeft:10, cursor:'pointer'}}>
                  <img src={`${image3}`} className='Friendsimage' alt="" />
                  <p style={{textAlign:'start', marginLeft:"10px"}}>Elon</p>
                </div>
              </div>

              <div style={{marginTop:"10px"}}>
                <div style={{display:'flex', alignItems:'center', marginLeft:10, cursor:'pointer'}}>
                  <img src={`${image4}`} className='Friendsimage' alt="" />
                  <p style={{textAlign:'start', marginLeft:"10px"}}>Camille</p>
                </div>
              </div>

            </div>
        </div>

        <div className="Rightcontainer2">
          <h3 style={{textAlign:'start', marginLeft:'10px'}}>Suggested for you</h3>
          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image2}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Khushboo</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Suggested for you</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image1}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Samridhi</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image2}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Camille</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image3}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Gabriel</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image4}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Emily</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image5}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Elvis</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image6}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Elon</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>

          <div style={{marginTop:"-10px"}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={`${image4}`} className='Profileimage' alt="" />
                <div>
                  <p style={{marginLeft: "10px", textAlign:'start'}}>Kiara</p>
                  <p style={{marginLeft: "10px", textAlign:'start', marginTop:"-16px", fontSize:"11px", color:"#aaa"}}>Followed by Khushboo</p>
                </div>
              </div>

              <div style={{backgroundColor:'#aaa', padding:'10px', marginRight:13, borderRadius:"50%", cursor:"pointer"}}>
                <img src={`${addFriends}`} className='addfriend' alt="" />
              </div>
            </div>
          </div>
        </div>




    </div>
  )
}
