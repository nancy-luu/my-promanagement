import { BrowserRouter, Route, Switch } from 'react-router-dom';

//pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

//styles
import './App.css'

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Create />
      <Login />
      <Project />
      <Signup />
    </div>
  );
}

export default App
