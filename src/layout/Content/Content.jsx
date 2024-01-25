import React from "react";
import Navbar from "../Navbar/Navbar";
import { Route, Switch } from "react-router-dom";

import "./Content.css";
import Dashboard from "../../pages/dashboard/Dashboard";
import CalendarDash from "../../pages/calendar/CalendarDash";
import CreateMeeting from "../../pages/calendar/CreateMeeting";
import ProjectsDash from "../../pages/projects_board/ProjectsDash";
import CreateProject from "../../pages/projects_board/CreateProject";
import Project from "../../pages/project/Project";
import TeamDash from "../../pages/team_board/TeamDash";
import DepartmentTeamInfo from "../../pages/team_board/DepartmentTeamInfo";
import UserProfile from "../../pages/team_board/UserProfile";
import Footer from '../Footer/Footer';
import MeetingInfo from "../../pages/meeting/MeetingInfo";

const Content = ({ user }) => {
  return (
    <div className="main-content">
      <Navbar />
      <div className="main-content-body">
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/calendar">
            <CalendarDash />
          </Route>
          <Route path="/createMeeting">
            <CreateMeeting />
          </Route>
          <Route path="/meetings/:id">
            <MeetingInfo />
          </Route>
          <Route path="/createProject">
            <CreateProject />
          </Route>
          <Route path="/projects/:id">
            <Project />
          </Route>
          <Route exact path="/projects">
            <ProjectsDash />
          </Route>
          <Route path="/team/user/:id">
            <UserProfile />
          </Route>
          <Route path="/team/:department">
            <DepartmentTeamInfo />
          </Route>
          <Route path="/team">
            <TeamDash />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Content;
