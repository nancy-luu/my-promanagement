import { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom";
import { navigationLinks } from "../../util/navlinks";
import { SidebarContext } from "../../context/SidebarContext";
import { sideBarImgs } from '../../util/images';


// styles
import "./Sidebar.css";
import { set } from "date-fns";


export default function Sidebar({ }) {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass("sidebar-change")
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="navigation">
        <ul className="nav-list">
          <div className="logo-container">
            <img src={sideBarImgs.logo} alt="logo" className="logo nav-link-icon"/>
            <h3 className="nav-link-text">ProManagement</h3>
          </div>
          {navigationLinks.map((nav) => (
            <li className="nav-item" key = {nav.id}>
              <NavLink 
                // className={`nav-link ${ nav.id === activeLinkIdx ? 'active' : null }`}
                className="nav-link"
                activeClassName="active"
                exact to={nav.path}>
                <img src={nav.image} alt={nav.title} className="nav-link-icon"/>
                <span className="nav-link-text">{nav.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
