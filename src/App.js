import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import OnlineUsers from "./components/OnlineUsers";

//styles
import "./App.css";

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
                <Route path="/create">
                  {!user && <Redirect to="/login" />}
                  {user && <Create />}
                </Route>
                <Route path="/users">
                  {!user && <Redirect to="/login" />}
                  {user && <OnlineUsers />}
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
