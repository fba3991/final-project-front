import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './components/Home';
import Navbar from './components/Navbar';
import PlayerList from './components/PlayerList';
import CreatePlayer from './components/CreatePlayer';
import EditPlayer from './components/EditPlayer';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Players" element={<PlayerList />} />
      <Route path="/Players/create" element={<CreatePlayer />} />
      <Route path="/Players/:id/edit" element={<EditPlayer />} />
    </Routes>

    
    </>



  );
}





export default App
