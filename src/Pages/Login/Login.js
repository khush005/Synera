import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./login.css"
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../Component/ReduxContainer/apiCall';
import saveone from "../../Component/Images/Background.png"
import logo from "../../Component/Images/syneraa.png"

export default function Login() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // To display error messages

  const isEmailValid = (email) => {
    // Email validation regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const handleClick = (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      setErrorText('Please enter a valid email address.');
    } else if (password.length < 6) {
      setErrorText('Password should be at least 6 characters long.');
    } else {
      setErrorText('');
      login(dispatch, { email, password });
    }
  }

  return (
    <div className='mainContainerForSignup'>
      <div className="subMainLoginContainer">
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "-300px" }}>
        {/* <div className='left'> */}
          {/* <p className='logoText'>Syn<span className='part'>era</span></p> */}
          {/* <p className='introText'>Connect with your <span className='part'>Friends</span></p> */}
          <img style={{position:"relative", top:"-150px", left:"157px", height:"550px", borderRadius:20}} src={saveone} alt="" />
        </div>
        <div style={{ flex: 3, color:"white" }}>
          <img src={logo} style={{height:"90px", width:"140px", borderRadius:"20px", marginRight:"280px"}} alt="" />
          <p className='createAccountText'>Login account</p>
          <input type="email" name='' id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='inputText' />
          <input type="password" placeholder='******' name='' onChange={(e) => setPassword(e.target.value)} id='password' className='inputText' />
          {errorText && <p className='errorText'>{errorText}</p>}
          {error && <p className='errorText'>{error}</p>}
          <button className='btnforsignup' onClick={handleClick}>Login</button>
          <Link to={"/forgot/password"}>
            <p style={{ textAlign: 'start', marginLeft: "30.6%", color:"white" }}>Forgot Password?</p>
          </Link>
          <Link to={"/signup"}>
            <p style={{ textAlign: 'start', marginLeft: "30.6%", color:"white" }}>Create a new account</p>
          </Link>
          <Link to={"/p2p"}>
          <p style={{ textAlign: 'start', marginLeft: "30.6%", color:"white" }}>File Transfer</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import "./login.css"
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from '../../Component/ReduxContainer/apiCall'

// export default function Login() {
//   const dispatch = useDispatch()
//   const {isFetching  , error} = useSelector((state)=>state.user);
//   const [email , setemail]= useState('');
//   const [password , setPassword] = useState('');

//   const handleClick = (e)=>{
//     e.preventDefault();
//     login(dispatch ,{email , password});
//   }

//   return (
//     <div className='mainContainerForSignup'>
//       <div className="subMainContainer">
//         <div style={{flex:1, marginLeft:150, marginBottom:"170px"}}>
//             <p className='logoText'>Syn<span className='part'>era</span></p>
//             {/* <p className='introText'>Connecting hearts, Creating Bonds</p> */}
//             <p className='introText'>Connect with your <span className='part'>Friends</span></p>
//         </div>
//         <div style={{flex:3}}>
//             <p className='createAccountText'>Login account</p>
//             <input type="email" name='' id='email' placeholder='Email' onChange={(e) => setemail(e.target.value)} className='inputText'/>
//             <input type="password" placeholder='******' name='' onChange={(e) => setPassword(e.target.value)} id='password' className='inputText'/>
//             <button className='btnforsignup' onClick={handleClick}>Login</button>
//             <Link to={"/forgot/password"}>
//                 <p style={{textAlign:'start', marginLeft:"30.6%"}}>Forgot Password?</p>
//             </Link>
//             <Link to={"/signup"}>
//                 <p style={{textAlign:'start', marginLeft:"30.6%"}}>Create new account</p>
//             </Link>
//         </div>
//       </div>
//     </div>
//   )
// 