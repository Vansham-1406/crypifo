import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Full from './Full'
import App from './App';
import News from './news';
import About from './About';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PersonIcon from '@mui/icons-material/Person';
import Crypto from './Crypto';


const Brow = ({nav}) => {
  console.log('nav', nav)
  return (
    <div>
        <div className={"navbar"}>
            <h2>CRYPTO CURRENCY</h2>
            <ul>
              <li className='active'><Link to="/" className='tag'><HomeIcon className='icon'/>Home</Link></li>
              <li><Link to="/Crypto" className='tag'><ShowChartIcon className='icon'/>Crypto Currency</Link></li>
              <li><Link to="/News" className='tag'><LightbulbIcon className='icon'/>News</Link></li>
              <li><Link to="/About" className='tag'><PersonIcon className='icon'/>About</Link></li>
            </ul>
          </div>
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