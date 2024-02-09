import { useState } from 'react'
import './App.scss'
import PlayersForms from './components/PlayersForms'
import PlayersList from './components/PlayersList'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
function App() {
  

  return (
    <Routes>
        <Route 
          path="/"
           element={
           <>
            <Navbar/>
           <Home/> 
           </>
           }
        />
        
   
        <Route 
          path="/PlayersList"
           element={
           <>
            <Navbar/>
           <PlayersList/> 
           </>
           }
        />
        <Route 
          path="/PlayersForms"
           element={
           <>
            <Navbar/>
           <PlayersForms/> 
           </>
           }
        />
        
        
    </Routes>
    
  );
}

export default App
