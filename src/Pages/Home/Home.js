import React from 'react'
import "./home.css"
import Navbar from "../../Component/Navbar/Navbar"
import Leftbar from "../../Component/LeftsideContainer/Leftbar"
import Rightbar from '../../Component/RightsideContainer/Rightbar'
import MainPost from '../../Component/MainPostContainer/MainPost'

export default function Home() {
  return (
    <div className='home'>
      <Navbar/>
      <div className='ComponentContainer'>
        <Leftbar/>
        <MainPost/>
        <Rightbar/>
      </div> 
    </div>
  )
}
