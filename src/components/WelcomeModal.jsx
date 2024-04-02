import { useState } from 'react'

import "./WelcomeModal.css"

const WelcomeModal = () => {
    const [appear, setAppear] = useState(true);

    const toggleModal = () => {
        setAppear(false);
    }
 
  return (
    <>
      <div className={`modal ${appear ? 'active' : ''}`}>
        <div className="modal-content">
            <h3>
                Welcome to
            </h3>
            <h1>ProManagement</h1>
            <p> 
                Please note that this version is for demonstration purposes only. Any new documents and accounts generated will be purged daily at 1 AM PDT. If you're interested in accessing a version for personal use, please reach out to me directly via email at <a href="mailto:nluuarch@gmail.com">nluuarch@gmail.com</a>. 
            </p>
            <div className="modal-btn-group">  
                <button className="btn" onClick={toggleModal}>Continue</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default WelcomeModal
