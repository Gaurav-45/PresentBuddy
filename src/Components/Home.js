import React from 'react'
import { Link } from "react-router-dom";
import './Home.css'


const Home = () => {
  return (
    <div>
        <div className="mic_img">
            <img src="mic.png" alt="" />
        </div>
        <div className="camera_img">
            <img src="camera.png" alt="" />
        </div>
    <div className='home'>
        <div className="card">
            <h1>Welcome to present-buddy👋</h1>
            
            <p className='subtitle'>One place for all your presentation needs</p>
            <Link to="/screen">
                <div className="btn">
                    <h3>Record Screen</h3>
                </div>
            </Link>
            <Link to='/camera'>
                <div className="btn">
                    <h3>Record Camera</h3>
                </div>
                </Link>
            <Link to='/audio'>
                <div className="btn">
                    <h3>Record Audio</h3>
                </div>
            </Link>
            <Link to='/voice'>
                <div className="btn">
                    <h3>Text to voice</h3>
                </div>
            </Link>
        </div>
        
    </div>
    </div>
  )
}

export default Home