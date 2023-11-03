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
import Team from "./components/Team";
import Dashboard from "./pages/dashboard/Dashboard";
import CalendarDash from "./pages/calendar/CalendarDash";
import CreateMeeting from "./pages/calendar/CreateMeeting";

//styles
import "./App.css";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {/* we'll only render when authIsReady from userAuthContext */}
        {authIsReady && (
          <BrowserRouter>
          {authIsReady && <Navbar />}
          <div className="main-content">
            {user && <Sidebar />}
            <div className="container">
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/login" />}
                  {user && <Dashboard />}
                </Route>
                <Route exact path="/calendar">
                  {!user && <Redirect to="/login" />}
                  {user && <CalendarDash />}
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
                <Route path="/team">
                  {!user && <Redirect to="/login" />}
                  {user && <Team />}
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
