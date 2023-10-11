import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProjectsBoard from "./pages/projects_board/ProjectsBoard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Team from "./components/Team";

//styles
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";

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
                <Route exact path="/projects">
                  {!user && <Redirect to="/login" />}
                  {user && <ProjectsBoard />}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
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
            </div>
            {/* {user && <OnlineUsers />} */}
          </div>
          </BrowserRouter>
        )}
    </div>
  );
}

export default App;
