import React from 'react'
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='footer'>
        <h5>CryptoCurrencies</h5>
        <h6>All Rights Reserved</h6>
        <ul>
            <li className='active' onClick={()=>{
              navigate("/")
            }}>
              {/* <Link to="/" className='tag'>Home</Link> */}
              Home
            </li>
            <li className='active' onClick={()=>{
              navigate("/Crypto")
            }}>
              CryptoCurrencies
            </li>
            <li className='active' onClick={()=>{
              navigate("/News")
            }}>
              News
            </li>
            <li className='active' onClick={()=>{
              navigate("/About")
            }}>
              About
            </li>
        </ul>
    </div>
  )
}

export default Footer