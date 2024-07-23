import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Full from './Full'
import App from './App';
import News from './news';
import About from './About';
import Crypto from './Crypto';


const Brow = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<App/>}></Route>
            <Route path="/Crypto" element={<Full/>}></Route>
            <Route path="/News" element={<News/>}></Route>
            <Route path="/About" element={<About/>}></Route>
            <Route path="/Crypto/:id" element={<Crypto/>}></Route>
      </Routes>
    </div>
  )
}

export default Brow