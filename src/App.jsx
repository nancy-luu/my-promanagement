import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// components
import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";
import Home from "./pages/home/Home";
import BackToTop from "./components/BackToTop";
// import Footer from "./components/Footer";

//styles
import "./App.css";

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
                  <div className="accessed-app">
                    <Sidebar sidebarToggle={sidebarToggle} OpenSideBar={OpenSideBar} /> 
                    <Content user={user}/>
                  </div>
                  ):(
                    <></>
                  )
                }
                <Switch>
                  <Route path="/">
                    {authIsReady && !user ? <Home /> : <></>}
                  </Route>
                </Switch>
              {authIsReady && <BackToTop />}
          </BrowserRouter>
    </div>
  );
}

export default App;
