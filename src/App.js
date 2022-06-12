import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Screen from './Components/Screen';
import Camera from './Components/Camera'
import Audio from './Components/Audio'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/screen" element={ <Screen/> } />
        <Route path="/camera" element={ <Camera/> } />
        <Route path="/audio" element={ <Audio/> } />
      </Routes>
    </div>
  );
}

export default App;
