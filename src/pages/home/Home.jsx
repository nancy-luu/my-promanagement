import WelcomeModal from '../../components/WelcomeModal'
import { homeImgs } from '../../util/images'
import SignupLogin from '../login-signup/SignupLogin'

import './Home.css'

export default function Home () {
  return (
    <>
      <WelcomeModal />
      <div className="home-wrapper">
        <div className="home-content">
          <div className="home-left-content">
            <div className="home-img">
              <img src={homeImgs.home} alt="home icon"/>
            </div>
          </div>
          <div className="home-right-content">
            <div className="login-signup-container">
              <SignupLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


