import './App.css';
import Home from "./Pages/Home/Home"
import Profile from './Pages/Profile/Profile';
import Login from './Pages/Login/Login';
import Signup from './Pages/Register/Signup';
import Chat from './Pages/Chat/Chat'
import { 
  BrowserRouter, 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Resetpassword from './Pages/Resetpassword/Resetpassword';
import Verifyemail from './Pages/VerifyEmail/Verifyemail'
import Forgotpassword from './Pages/Forgotpassword/Forgotpassword';
// import CreateRoom from '../p2pfiletransfer/client/src/routes/CreateRoom';
// import Room from '../p2pfiletransfer/client/src/routes/Room';
// import CreateRoom from './Component/FileTransfer/CreateRoom';
// import Room from './Component/FileTransfer/Room';

function App() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  // console.log(user.other.verified);
  // console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ user?.other?.verified === true ? <Home/> : <Navigate to={"/login"} replace={true} /> }></Route>
          <Route path='/Profile/:id' element={<Profile/>}></Route>
          <Route path='/login' element={ user?.other?.verified === true ? <Navigate to={"/"} replace={true}/> : <Login/>}></Route>
          <Route path='/signup' element={ <Signup/>}></Route>
          <Route path='/verify/email' element={ user?.Status === 'Pending' ? <Verifyemail/> : user?.other?.verified === true ? <Navigate to={"/"} replace={true}/> : <Login/> }></Route>
          <Route path='/forgot/password' element={ <Forgotpassword/> }></Route>
          <Route path='/reset/password' element={ <Resetpassword/> }></Route>
          <Route path = "/chat" element={<Chat/>}></Route>
          {/* <Route path='/p2p' exact element={<CreateRoom/>}></Route> */}
          {/* <Route path='/p2p/room/:roomID' element={<Room/>}></Route> */}

          {/* <Route path='/' element={ user?.other?.verified === true ? <Home/> : <Login/>}></Route> */}
          {/* <Route path='/login' element={<Login/>}></Route> */}
          {/* <Route path='/verify/email' element={ user?.Status === 'Pending' ? <Verifyemail/> : <Home/> }></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
