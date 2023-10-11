import './App.css';
import Home from "./Pages/Home/Home"
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import { 
  BrowserRouter, 
  Routes,
  Route
} from 'react-router-dom';
import Signup from './Pages/Register/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Profile/:id' element={<Profile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
