import React from 'react'
import Navbar from '../../components/Navbar';
import { Route } from "react-router-dom";


import './Content.css'
import Dashboard from '../../pages/dashboard/Dashboard'

const Content = () => {
  return (
    <div className="main-content">
      <Navbar />
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </div>
  )
}

export default Content
