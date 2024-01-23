import { homeImgs } from '../../util/images'

import './Home.css'
import Signup from "../login-signup/Signup"
import Login from "../login-signup/Login"

export default function Home () {
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <div className="home-left-content">
          <div className="home-text">
            <h1>Welcome to</h1>
          </div>
          <div className="home-img">
            <img src={homeImgs.home}/>
          </div>
          <div className="home-text">
            <h1>ProManagement</h1>
          </div>
        </div>
        <div className="home-right-content">
          <div className="login-signup-container">
            {/* <Login /> */}
          <Signup />
          </div>
        </div>
      </div>
    </div>
  )
}


