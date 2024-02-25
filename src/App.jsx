import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Pages
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Alert from './components/Alert';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Alert message='This is prem'/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App