
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import Home from './routes/Home/Home';
import Add from './routes/Add/Add';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import { Logout } from './routes/Logout/Logout';

function App() {
 
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="add" element={<Add />}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="logout" element={<Logout />}/>
      </Routes>
    </div>
  );
}

export default App;
