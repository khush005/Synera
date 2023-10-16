import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./login.css"
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../Component/ReduxContainer/apiCall'

export default function Login() {
  const dispatch = useDispatch()
  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email , setemail]= useState('');
  const [password , setPassword] = useState('');
  const handleClick = (e)=>{
    e.preventDefault();
    login(dispatch ,{email , password});
  }

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
            <input type="email" name='' id='email' placeholder='email' onChange={(e) => setemail(e.target.value)} className='inputText'/>
            <input type="password" placeholder='******' name='' onChange={(e) => setPassword(e.target.value)} id='password' className='inputText'/>
            <button className='btnforsignup' onClick={handleClick}>Login</button>
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
