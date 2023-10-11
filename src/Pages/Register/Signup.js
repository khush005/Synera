import React from 'react'
import {Link} from 'react-router-dom';
import "./signup.css"

export default function Signup() {
  return (
    <div className='mainContainerForSignup'>
      <div className="subMainContainer">
        <div style={{flex:1, marginLeft:150, marginBottom:"170px"}}>
            <p className='logoText'>Syn<span className='part'>era</span></p>
            {/* <p className='introText'>Connecting hearts, Creating Bonds</p> */}
            <p className='introText'>Connect with your <span className='part'>Friends</span></p>
        </div>
        <div style={{flex:3}}>
            <p className='createAccountText'>Create new account</p>
            <input type="text" placeholder='Username' className='inputText' />
            <input type="text" placeholder='Phonenumber' className='inputText'/>
            <input type="email" name='' id='' placeholder='email' className='inputText'/>
            <input type="password" placeholder='******' name='' id='' className='inputText'/>
            <button className='btnforsignup'>Signup</button>
            <Link to={"/"}>
                <p style={{textAlign:'start', marginLeft:"30.6%"}}>Already have an account?</p>
            </Link>
        </div>
      </div>
    </div>
  )
}
