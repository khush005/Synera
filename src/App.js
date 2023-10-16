import './App.css';
import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import { 
  BrowserRouter, 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Signup from './Pages/Register/Signup';
import { useSelector } from 'react-redux';

function App() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Profile/:id' element={<Profile/>}></Route>
          <Route path='/login' element={ user !== null ? <Navigate to={"/"} /> : <Login/>}></Route>
          <Route path='/signup' element={ user !== null ? <Navigate to={"/"} /> : <Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
