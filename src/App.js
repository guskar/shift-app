
import './App.css';
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import Home from './routes/Home/Home';
import Add from './routes/Add/Add';

function App() {
 
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="add" element={<Add />}/>
      </Routes>
    </div>
  );
}

export default App;
