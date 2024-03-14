import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// styles
import './index.css';
import { SidebarProvider } from './context/SidebarContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </SidebarProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);