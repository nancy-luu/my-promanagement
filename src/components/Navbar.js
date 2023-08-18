import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
            <img src={Logo} alt="promanagemt logo" />
            <span>ProManagement</span>
        </li>

        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <li>
            <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  )
}
