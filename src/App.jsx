import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss'
import Home from './components/Home';
import Navbar from './components/Navbar';
import PlayerList from './components/PlayerList';
import CreatePlayer from './components/CreatePlayer';
import EditPlayer from './components/EditPlayer';
import PlayerPage from './components/PlayerPage';
import Storia from './components/Storia';
import NotFound from './components/NotFound';
import RosaSquadra from './components/RosaSquadra';
import SquadraManager from './components/SquadraManager';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayerList />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/create-player" element={<CreatePlayer />} />
        <Route path="/edit-player/:id" element={<EditPlayer />} />
        <Route path="/rosa" element={<RosaSquadra />} />
        <Route path="/storia" element={<Storia />} />
        <Route path="/gestione-squadra" element={<SquadraManager />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App



