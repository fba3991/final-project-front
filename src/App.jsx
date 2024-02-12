import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './components/Home';
import Navbar from './components/Navbar';
import PlayerList from './components/PlayerList';
import CreatePlayer from './components/CreatePlayer';
import EditPlayer from './components/EditPlayer';

function App() {
  return (
    <Routes>
      <Route 
        path="/"
        element={
          <>
            <Navbar />
            <Home /> 
          </>
        }
      />
      <Route 
        path="/Players"
        element={
          <>
            <Navbar />
            <PlayerList /> 
          </>
        }
      />
      <Route 
        path="/Players/create"
        element={
          <>
            <Navbar />
            <CreatePlayer /> 
          </>
        }
      />
      <Route 
        path="/Players/:id"
        element={
          <>
            <Navbar />
            <EditPlayer /> 
          </>
        }
      />
    </Routes>
  );
      }

export default App
