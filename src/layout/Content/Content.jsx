import React from 'react'
import Navbar from '../../components/Navbar';
import { Route } from "react-router-dom"; 


import './Content.css'
import Dashboard from '../../pages/dashboard/Dashboard'
import CalendarDash from '../../pages/calendar/CalendarDash';
import CreateMeeting from '../../pages/calendar/CreateMeeting';
import ProjectsDash from '../../pages/projects_board/ProjectsDash';
import CreateProject from '../../pages/projects_board/CreateProject';
import Project from '../../pages/project/Project';


const Content = ({ user }) => {
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
        <Route path="/createMeeting">
          <CreateMeeting />
        </Route>
        <Route exact path="/projects">
           <ProjectsDash />
        </Route>
        <Route path="/createProject">
          <CreateProject />
        </Route>
        <Route path="/projects/:id">
          <Project />
        </Route>
      </div>
    </div>
  )
}

export default Content
