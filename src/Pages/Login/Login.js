import React from 'react'
import { Link } from 'react-router-dom'
import "./login.css"

export default function Login() {
  return (
    <div className='mainContainerForSignup'>
      <div className="subMainContainer">
        <div style={{flex:1, marginLeft:150, marginBottom:"170px"}}>
            <p className='logoText'>Syn<span className='part'>era</span></p>
            {/* <p className='introText'>Connecting hearts, Creating Bonds</p> */}
            <p className='introText'>Connect with your <span className='part'>Friends</span></p>
        </div>
        <div style={{flex:3}}>
            <p className='createAccountText'>Login account</p>
            <input type="email" name='' id='' placeholder='email' className='inputText'/>
            <input type="password" placeholder='******' name='' id='' className='inputText'/>
            <button className='btnforsignup'>Login</button>
            <Link to={"/"}>
                <p style={{textAlign:'start', marginLeft:"30.6%"}}>Forgot Password?</p>
            </Link>
            <Link to={"/"}>
                <p style={{textAlign:'start', marginLeft:"30.6%"}}>Create new account</p>
            </Link>
        </div>
      </div>
    </div>
  )
}
