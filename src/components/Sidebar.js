import { NavLink } from "react-router-dom";
import { navigationLinks } from "../util/navlinks";
import { sideBarImgs } from "../util/images";

// styles and images
import "./Sidebar.css";


export default function Sidebar({ }) {

  return (
    <div className="sidebar">
      {/* <div className="sidebar-content">
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={sideBarImgs.dashboard} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar">
                <img src={sideBarImgs.calendar} alt="calendar icon" />
                <span>Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/projects">
                <img src={sideBarImgs.projects} alt="projects icon" />
                <span>Projects</span>
              </NavLink>
            </li>
            <li className="team-section">
              <NavLink to="/team">
                <img src={sideBarImgs.team} alt="team icon" />
                <span>Team</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div> */}
    <div className="navigation">
      
    </div>
    </div>
  );
}
