import React from 'react'
import Navbar from '../../components/Navbar'

import './Content.css'
import Dashboard from '../../pages/dashboard/Dashboard'

const Content = () => {
  return (
    <div className="main-content">
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default Content
