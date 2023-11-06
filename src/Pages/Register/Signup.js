import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import "./signup.css"
import { signup } from '../../Component/ReduxContainer/apiCall';
import app from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import logo from "../../Component/Images/syneraa.png"

export default function Signup() {
  
  const dispatch = useDispatch();
  const {isFetching  , error} = useSelector((state)=>state.user);
  const user = useSelector((state)=>state.user);

  const [email, setEmail] = useState('');
  const [phonenumber , setphonenumber] = useState('');
  const [username , setusername] = useState('');
  const [password , setpassword] = useState('');
  const [file , setfile] = useState(null);
  // console.log(user.user.Status);
  const [errorText, setErrorText] = useState(''); // To display error messages
  
  

  const isEmailValid = (email) => {
    // Email validation regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const isPhoneNumberValid = (phonenumber) => {
    // Phone number validation for 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phonenumber);
  }

  const userDetails = user.user;
  const navigator = useNavigate();

  const handleClick = (e)=>{
    e.preventDefault();

    setErrorText(''); // Clear any previous error messages

    const usernameRegex = /^\d{3}[A-Za-z0-9]*$/;

    if (!username || username.length <= 5) {
      setErrorText('Username should be more than 5 characters.');
    } else if (!isEmailValid(email)) {
      setErrorText('Please enter a valid email address.');
    } else if (!isPhoneNumberValid(phonenumber)) {
      setErrorText('Please enter a valid 10-digit phone number.');
    } else if (password.length < 6) {
      setErrorText('Password should be at least 6 characters long.');
    } else if (!file) {
      setErrorText('Please select a file.');
    } else if (!usernameRegex.test(username)) {
      setErrorText('Username should start with 3 digits and only contain alphanumeric characters.');
    } else {
      const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage , fileName);
    
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      signup(dispatch ,{email , password , username , phonenumber , profile:downloadURL});
      })
    });
  }
  }
    


  console.log(userDetails?.Status)
  if(userDetails?.Status==='Pending'){
    navigator("/verify/email");
  }

  
  return (
    <div className='mainContainerForSignup'>
      <div className="subMainContainer">
        <div style={{flex:1, marginLeft:150, marginBottom:"170px"}}>
            <p className='logoText'>Syn<span className='part'>era</span></p>
            {/* <p className='introText'>Connecting hearts, Creating Bonds</p> */}
            {/* <p className='introText'>Connect with your <span className='part'>Friends</span></p> */}
            <p className='introText'>Connecting Hearts🤍... <br></br><span className='part'>Creating Bonds🤝...</span></p>
        </div>
        <div style={{flex:3, color:"white"}}>
            <p className='createAccountText'>Create new account</p>
            <input type="file" name='file' id='file' onChange={(e)=> setfile(e.target.files[0])} style={{color:"white"}} />
            <input type="text" placeholder='Username' onChange={(e)=> setusername(e.target.value)}  className='inputText' />
            <input type="text" placeholder='Phonenumber' onChange={(e)=> setphonenumber(e.target.value)} className='inputText'/>
            <input type="email" name='' id='email' placeholder='email' onChange={(e)=> setEmail(e.target.value)} className='inputText'/>
            <input type="password" placeholder='******' name='' onChange={(e)=> setpassword(e.target.value)} id='password' className='inputText'/>
            {errorText && <p className='errorText'>{errorText}</p>}
          {error && <p className='errorText'>{error}</p>}
            <button className='btnforsignup' onClick={handleClick}>Signup</button>
            <Link to={"/login"}>
                <p style={{textAlign:'start', marginLeft:"30.6%", color:"white"}}>Already have an account?</p>
            </Link>
        </div>
      </div>
    </div>
  )
}