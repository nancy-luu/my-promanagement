import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";


// styles and images
import './Navbar.css'
import Logo from '../assets/logo.png'

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
            <img src={Logo} alt="promanagemt logo" />
            <span>ProManagement</span>
        </li>

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}

        {user && (
          <li>
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}
              {isPending && <button className="btn" disable>Logging out..</button>}
          </li>
        )}
      </ul>
    </div>
  )
}
