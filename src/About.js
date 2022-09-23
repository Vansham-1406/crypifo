import React from 'react'
import './App.css'
import Footer from './footer'

const About = () => {
  return (
    <div>
      <div className="mainNavBar">
          <div className="subPart">
            <div className="mainPage">
              <div>
                   <h2 className='about-head'>Hello I'm Vansham Aggarwal</h2>
              </div>
              <div>
                <h4 className='about-sub-head'>A full stack web-developer</h4>
              </div>
              <div className='about-para'>
                <h3 className='about-part'>A little details about the project are : </h3>
                <p>This project is built with React js, a beautiful and modern javascript library with lot's of cool features.</p>
                <p>This website provides current crypto rates and some crypto news articles.</p>
                <p>I have learnt many things with the help of this project.</p>
              </div>

              <div className='about-para1'>
                <h3 className='about-part'>Technical Details :  </h3>
                <p>I am fetching all the data from an outside API, thanks to Rapidapi . Then after getting all the data from the API i am using React to populate in the browser.
                </p>
                <p>For designing and icons i am using <b>Material UI</b> library.</p>
                <p className='lang'><b>Language</b> used : </p>
                <p>1) HTML </p>
                <p>2) CSS </p>
                <p>3) REACT JS </p>
                <p>4) MUI </p>
              </div>
              <Footer/>
            </div>
            </div>
            </div>
    </div>
  )
}

export default About