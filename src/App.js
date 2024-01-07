import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProjectsDash from "./pages/projects_board/ProjectsDash";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import TeamDash from "./pages/team_board/TeamDash";
import UserProfile from "./pages/team/UserProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import CalendarDash from "./pages/calendar/CalendarDash";
import CreateMeeting from "./pages/calendar/CreateMeeting";

//styles
import "./App.css";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import DepartmentTeamInfo from "./pages/team_board/DepartmentTeamInfo";
import Meeting from "./pages/meeting/MeetingInfo";
import MeetingInfo from "./pages/meeting/MeetingInfo";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const { user, authIsReady } = useAuthContext();

  const OpenSideBar = () => {
    setSidebarToggle(!sidebarToggle)
  }

  return (
    <div className="app">
      {/* we'll only render when authIsReady from userAuthContext */}
        {authIsReady && (
          <BrowserRouter>
          {authIsReady && <Navbar OpenSideBar={OpenSideBar}/>}
          <div className="main">
            {user && <Sidebar sidebarToggle={sidebarToggle} OpenSideBar={OpenSideBar} />}
            <div className="content">
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard />}
                </Route>
                <Route exact path="/calendar">
                  {!user && <Redirect to="/login" />}
                  {user && <CalendarDash />}
                </Route>
                <Route exact path="/meetings/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <MeetingInfo />}
                </Route>
                <Route exact path="/projects">
                  {!user && <Redirect to="/login" />}
                  {user && <ProjectsDash />}
                </Route>
                <Route path="/createProject">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/createEvent">
                  {!user && <Redirect to="/login" />}
                  {user && <CreateMeeting />}
                </Route>
                <Route path="/team/user/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <UserProfile />}
                </Route>
                <Route path="/team/:department">
                  {!user && <Redirect to="/login" />}
                  {user && <DepartmentTeamInfo />}
                </Route>
                <Route path="/team">
                  {!user && <Redirect to="/login" />}
                  {user && <TeamDash />}
                </Route>
                <Route path="/projects/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <Project />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && <Redirect to="/" />}
                  {!user && <Signup />}
                </Route>
              </Switch>
              {authIsReady && <BackToTop />}
            </div>
          </div>
              {authIsReady && <Footer />}
          </BrowserRouter>
        )}
    </div>
  );
}

export default App;
