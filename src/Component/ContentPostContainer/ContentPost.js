import React, { useState } from 'react'
import { Picker } from 'emoji-mart';
// import './emoji-mart/css/emoji-mart.css';
import "./contentpost.css"
import imageIcon from "../Images/gallery.png"
// import emojiIcon from "../Images/cat-face.png"
import videoIcon from "../Images/video.png"
import pdfIcon from "../Images/send-folder.png"
import audioIcon from "../Images/audio.png"
import { useSelector } from 'react-redux'
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ContentPost() {
  const userDetails = useSelector((state)=>state.user);
    let user = userDetails?.user;
    console.log(user);
    let id = user?.other?._id;
    const [file, setFile] = useState(null);
    const [file2 , setFile2] = useState(null);
    const [pdfFile, setPdfFile] = useState(null); // New state for PDF file
    const [audioFile, setAudioFile] = useState(null);
    const [title,setTitle] = useState('')
    const [imagePre,setimagePre] = useState(null)
    const [videoPre,setvideoPre] = useState(null)
    const [pdfPre, setPdfPre] = useState(null); // State to display the selected PDF file
    const [audioPre, setAudioPre] = useState(null); // State to display the selected audio file

    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // const handleEmojiClick = (emoji) => {
      // Handle the selected emoji, e.g., append it to your title or text input
      // setTitle((prevTitle) => prevTitle + emoji.native);
    // };

    const accessToken = user?.accessToken;
    // console.log(accessToken);
    console.log(file?.name)

    const handlePost = (e) =>{
      e.preventDefault();
      if(file !== null){
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage,fileName)
      
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
          fetch(`http://localhost:5000/api/post/user/post`, {method:"POST" , headers:{'Content-Type' :"application/JSON" , token : accessToken },body:JSON.stringify({title:title , image:downloadURL , video:''})}).then((data)=>{
            alert("your post was upload successfully");
            window.location.reload(true)
          })
        });
    }
  );
  }else if(file2 !== null){
        const fileName = new Date().getTime() + file2?.name;
        const storage = getStorage(app);
        const StorageRef = ref(storage,fileName);
      
        const uploadTask = uploadBytesResumable(StorageRef, file2);

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
            fetch(`http://localhost:5000/api/post/user/post`, {method:"POST" , headers:{'Content-Type' :"application/JSON" , token : accessToken}, body:JSON.stringify({title:title , video:downloadURL , image:''})}).then((data)=>{
              alert("your post was upload successfully");
              window.location.reload(true)
            })            
          });
      }
    );
      }
      else if (pdfFile) {
        const fileName = new Date().getTime() + pdfFile.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
  
        const uploadTask = uploadBytesResumable(storageRef, pdfFile);
  
        uploadTask.on('state_changed',
          (snapshot) => {
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Send the URL to your server
              fetch('http://localhost:5000/api/post/user/post', {
                method: "POST",
                headers: { 'Content-Type': 'application/JSON', token: accessToken },
                body: JSON.stringify({ title: title, pdf: downloadURL, image: '', video: '' })
              }).then((data) => {
                alert('Your post was uploaded successfully');
                window.location.reload(true);
              })
            });
          });
      } 
      else if (audioFile) {
        const fileName = new Date().getTime() + audioFile.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
      
        const uploadTask = uploadBytesResumable(storageRef, audioFile);
      
        uploadTask.on('state_changed',
          (snapshot) => {
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Send the URL to your server
              fetch('http://localhost:5000/api/post/user/post', {
                method: "POST",
                headers: { 'Content-Type': 'application/JSON', token: accessToken },
                body: JSON.stringify({ title, audio: downloadURL, image: '', video: '', pdf: '' })
              }).then((data) => {
                alert('Your post was uploaded successfully');
                window.location.reload(true);
              })
            });
          });
      }      
      else {
        fetch(`http://localhost:5000/api/post/user/post`, {method:"POST" , headers:{'Content-Type' :"application/JSON" , token : accessToken },body:JSON.stringify({title:title , video: '',image:''})}).then((data)=>{
          alert("your post was upload successfully");
          window.location.reload(true)
        })
      }
    }

  return (
    <div>
      <div className="ContentUploadContainer">
        <div style={{display:'flex', alignItems:'center', padding:10}}>
          <img src={`${user?.other?.profile}`} className='profileimage' alt="" />
          <input type="text" className='contentWritingpart' placeholder='Write your real thought' onChange={(e)=>setTitle(e.target.value)}/>
        </div>

        <div style={{ marginLeft:'10px'}}>
        {/* {
            imagePre !== null ? <img src = {imagePre} style ={{width:"410px" , height:"250px" , objectFit:"cover" ,borderRadius:"10px"}} alt =" "/> : videoPre !== null ? <video className='PostImages' width="450" height="500" controls >
            <source src={videoPre} type="video/mp4"/>
        </video> : ''
          } */}

          {pdfPre !== null ? (
            // Display the selected PDF file
            <div>
              <img src={pdfIcon} style={{ width: "32px"}} alt="PDF icon" />
              {pdfPre}
            </div>
          ) : (
            // Display image or video as before
            imagePre !== null ? (
              <img src={imagePre} style={{ width: "410px", height: "250px", objectFit: "cover", borderRadius: "10px" }} alt=" " />
            ) : videoPre !== null ? (
              <video className='PostImages' width="450" height="500" controls>
                <source src={videoPre} type="video/mp4" />
              </video>
            ) : audioPre !== null ? (
              // Display the audio content
              <audio controls>
                <source src={audioPre} type="audio/mp3" />
              </audio>
            ) : null
          )}

          <div style={{display:"Flex" , justifyContent:"space-between"}}>
          <div>
            <label htmlFor="file">
              <img src={`${imageIcon}`}  className='icons' alt="" />
              <input type="file" name='file' id='file' style={{display:"none"}} onChange={(e)=>[setFile(e.target.files[0]),setimagePre(URL.createObjectURL(e.target.files[0]))]} />
            </label>

            {/* <img src={`${emojiIcon}`} className='icons' alt="" onClick={() => setShowEmojiPicker(!showEmojiPicker)}/> */}

            <label htmlFor="file2">
              <img src={`${videoIcon}`} className='icons' alt="" />
              <input type="file" name='file2' id='file2' style={{display:"none"}} onChange={(e)=>[setFile2(e.target.files[0]),setvideoPre(URL.createObjectURL(e.target.files[0]))]} />
            </label>

            <label htmlFor="pdfFile">
                <img src={`${pdfIcon}`} className='icons' alt="" />
                <input type="file" name='pdfFile' id='pdfFile' style={{ display: "none" }} onChange={(e) => [setPdfFile(e.target.files[0]), setPdfPre(e.target.files[0].name)]} />
              </label>

              <label htmlFor="audioFile">
                <img src={`${audioIcon}`} className='icons' alt="" />
                <input type="file" name='audioFile' id='audioFile' style={{ display: "none" }} onChange={(e) => [setAudioFile(e.target.files[0]), setAudioPre(e.target.files[0].name)]} />
              </label>
          </div>
          <button style={{height:"30ox",marginRight:"12px",marginTop: "40px", paddingLeft:"20px", paddingRight:"20px", paddingTop:6, paddingBottom:6, border:"none", backgroundColor:"black", color:"white", borderRadius:"5px", cursor:"pointer"}} onClick={handlePost}>Post</button>
        </div>
        </div>
      </div>

      {/* {showEmojiPicker && (
        <div className="emoji-picker-container">
          <Picker onSelect={handleEmojiClick} />
        </div>
      )}  */}

    </div>
  )
}
