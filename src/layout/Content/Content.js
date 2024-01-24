import React from 'react'
import Navbar from '../../components/Navbar';
import { Route } from "react-router-dom";


import './Content.css'
import Dashboard from '../../pages/dashboard/Dashboard'
import CalendarDash from '../../pages/calendar/CalendarDash';


const Content = () => {
  return (
    <div className="main-content">
      <Navbar />
      <div className="main-content-body">
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/calendar">
          <CalendarDash />
        </Route>
      </div>
    </div>
  )
}

export default Content
