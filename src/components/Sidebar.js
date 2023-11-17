import { NavLink } from "react-router-dom";

// styles and images
import "./Sidebar.css";
import Logo from '../assets/logo.png'
import DashboardIcon from "../assets/dashboard_icon.png";
import ProjectsIcon from "../assets/projects_icon.png";
import CalendarIcon from "../assets/calendar.png";
import TeamIcon from "../assets/team.png";
import ArrowIcon from "../assets/arrowright.png";


export default function Sidebar() {

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
              <NavLink to="/calendar">
                <img src={CalendarIcon} alt="calendar icon" />
                <span>Calendar</span>
                <img className="arrow" src={ArrowIcon} alt="arrow icon" />
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/projects">
                <img src={ProjectsIcon} alt="projects icon" />
                <span>Projects</span>
                <img className="arrow" src={ArrowIcon} alt="arrow icon" />
              </NavLink>
            </li>
            <li className="team-section">
              <NavLink to="/team">
                <img src={TeamIcon} alt="team icon" />
                <span>Team</span>
                <img className="arrow" src={ArrowIcon} alt="arrow icon" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
