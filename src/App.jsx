import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./layout/Sidebar/Sidebar";
import Login from "./pages/login-signup/Login";
import Signup from "./pages/login-signup/Signup";
import ProjectsDash from "./pages/projects_board/ProjectsDash";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Meeting from "./pages/meeting/MeetingInfo";
import MeetingInfo from "./pages/meeting/MeetingInfo";
import CreateMeeting from "./pages/calendar/CreateMeeting";
import TeamDash from "./pages/team_board/TeamDash";
import DepartmentTeamInfo from "./pages/team_board/DepartmentTeamInfo";
import UserProfile from "./pages/team/UserProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import CalendarDash from "./pages/calendar/CalendarDash";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

//styles
import "./App.css";
import Content from "./layout/Content/Content";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const { user, authIsReady } = useAuthContext();

  const OpenSideBar = () => {
    setSidebarToggle(!sidebarToggle)
  }
  console.log('user:', user);
  console.log('authIsReady:', authIsReady);

  return (
    <div className="app">

          <BrowserRouter>
                {authIsReady && user ? (
                  <>
                    <Sidebar sidebarToggle={sidebarToggle} OpenSideBar={OpenSideBar} /> 
                    <Content />
                  </>
                  ):(
                    <></>
                  )
                }
                <Switch>
                {/* {!user && <Link to="/login">Login</Link>}
                    {!user && <Link to="/signup">Signup</Link>} */}
                  <Route path="/signup">
                    {authIsReady && !user ? <Signup /> : <></>}
                  </Route>
                  <Route path="/login">
                    {authIsReady && !user ? <Login /> : null}
                  </Route>
                </Switch>
              {authIsReady && <BackToTop />}
          </BrowserRouter>
                {/* <Route exact path="/home">
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
                </Route> */}
              {/* {authIsReady && <Footer />} */}
    </div>
  );
}

export default App;
