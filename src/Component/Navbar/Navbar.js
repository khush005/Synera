import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css"
import searchIcon from "../Images/search.png"
import Notification from "../Images/bell.png" 
import Message from "../Images/message.png"
import Profile from "../Images/Profile.png"

export default function Navbar() {
  return (
    <div className='mainNavbar'>
      <div className='LogoContainer'>
        <p>Synera</p>
      </div>
      <div>
        <div className='searchInputContainer'>
            <img src={`${searchIcon}`} className='searchIcon' alt="" />
            <input type="text" className='searchInput' placeholder='search your friends' name='' id='' />
        </div>
      </div>
      <div className='IconsContainer'>
        <img src={`${Notification}`} className='Icons' alt="" />
        <img src={`${Message}`} className='Icons' alt="" />

        <Link to={"/Profile/1"}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={`${Profile}`} className='ProfileImage' alt="" />
            <p style={{marginLeft: '5px'}}>Khushboo</p>
        </div>
        </Link>

      </div>
    </div>
  )
}