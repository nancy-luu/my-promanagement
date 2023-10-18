import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// styles
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);