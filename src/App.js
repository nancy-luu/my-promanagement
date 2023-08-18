import { BrowserRouter, Route, Switch } from 'react-router-dom';

//pages and components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';

//styles
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="container"> 
        <Navbar />
          <Switch>
            <Route exact path='/'>
              <Dashboard /> 
            </Route>
            <Route exact path='/create'>
              <Create />
            </Route>
            <Route exact path='/projects/:id'>
              <Project />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
