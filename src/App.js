
import './App.css';
import HouseCard from './components/HouseCard';
import { useEffect, useState } from 'react';
import CreateHouseForm from './components/CreateHouseForm';


function App() {
 
  
  return (
    <div className="App">
     
      <HouseCard />
      <CreateHouseForm/>

    </div>
  );
}

export default App;
