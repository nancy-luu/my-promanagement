import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from './Avatar'


// styles
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.png";
import ArrowIcon from "../assets/arrowright.png";
import AddIcon from "../assets/add_icon.png";
import UsersIcon from "../assets/user.png";


export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
                <img className="arrow" src={ArrowIcon} alt="arrow icon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
                <img className="arrow" src={ArrowIcon} alt="arrow icon" />
              </NavLink>
            </li>
            <li className="users-section">
              <NavLink to="/users">
                <img src={UsersIcon} alt="add icon" />
                <span>Users</span>
                <img className="arrow" src={ArrowIcon} alt="arrow icon" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
