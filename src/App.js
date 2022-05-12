
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import Home from './routes/Home/Home';
import ManageHouses from './routes/ManageHouses/ManageHouses';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import { Logout } from './routes/Logout/Logout';
import House from './routes/House/House';
import Profile from './routes/Profile/Profile';


function App() {
 
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="userhouses" element={<ManageHouses />}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="logout" element={<Logout />}/>
        <Route path="houses/:id" element={<House />}/>
      </Routes>
    </div>
  );
}

export default App;
