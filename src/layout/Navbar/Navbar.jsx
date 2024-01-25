import { useState, useContext } from 'react'
import { SidebarContext } from '../../context/SidebarContext';
import { navbarImgs } from '../../util/images';
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

// components
import Avatar from '../../components/Avatar';

// styles and images
import './Navbar.css'


import SearchBar from '../../pages/projects_board/SearchBar';

export default function Navbar({ OpenSideBar }) {
  const { toggleSidebar } = useContext(SidebarContext); 
  const { documents, error } = useCollection("projects");
  const [query, setQuery] = useState([]);


  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const projectSearchList = documents && documents.map((document) => ({name: document.name, docId: document.id}))

  return (
    <div className="main-content-top">
      <div className="content-top-left">
          <img src={navbarImgs.menu} alt="menu icon" className="sidebar-toggler" onClick={() => toggleSidebar()}/>
      </div>
      <div className="content-top-center">
              <SearchBar data={projectSearchList} query={query} setQuery={setQuery}/>
      </div>
      <div className="content-top-right">
            <div className="user-content">
              <Avatar src={user.photoURL}/>
              <h4>{user.displayName}</h4>
            </div>
            <div>
                {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                {isPending && <button className="btn" disable>Logging out..</button>}
            </div>
      </div>
    </div>
  )
}
