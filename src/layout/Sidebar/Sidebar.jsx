import { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navigationLinks } from "../../util/navlinks";
import { SidebarContext } from "../../context/SidebarContext";
import { sideBarImgs } from '../../util/images';

// styles
import "./Sidebar.css";

export default function Sidebar() {
  const [sidebarClass, setSidebarClass] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const { isSidebarOpen } = useContext(SidebarContext);
  const location = useLocation();


  useEffect(() => {
    const matchedLink = navigationLinks.find(nav => nav.path === location.pathname);
    setSelectedLink(matchedLink ? matchedLink.id : null);
    setSidebarClass(isSidebarOpen ? "sidebar-change" : "");
  }, [isSidebarOpen, location]);

  const handleSelected = (navId) => {
    setSelectedLink(navId);
  }

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="navigation">
        <ul className="nav-list">
          <div className="logo-container">
            <img src={sideBarImgs.logo} alt="logo" className="logo nav-link-icon"/>
            <h3 className="nav-link-text">ProManagement</h3>
          </div>
          {navigationLinks.map((nav) => (
            <li className="nav-item" key={nav.id}>
              <NavLink 
                className="nav-link"
                activeClassName="active"
                exact 
                to={nav.path}
                onClick={() => handleSelected(nav.id)} 
              >
                <img 
                  src={selectedLink === nav.id ? nav.orange : nav.image} 
                  alt={nav.title} 
                  className="nav-link-icon"
                />
                <span className="nav-link-text">{nav.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
