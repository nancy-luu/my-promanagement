import { NavLink } from "react-router-dom";

// styles and images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.png";
import ProjectsIcon from "../assets/projects_icon.png";
import CalendarIcon from "../assets/calendar.png";
import TeamIcon from "../assets/team.png";


export default function Sidebar({ sidebarToggle, OpenSideBar}) {

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar">
                <img src={CalendarIcon} alt="calendar icon" />
                <span>Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/projects">
                <img src={ProjectsIcon} alt="projects icon" />
                <span>Projects</span>
              </NavLink>
            </li>
            <li className="team-section">
              <NavLink to="/team">
                <img src={TeamIcon} alt="team icon" />
                <span>Team</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
