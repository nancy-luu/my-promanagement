import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

// components
import Avatar from './Avatar';

// styles and images
import './Navbar.css'
import Logo from '../assets/logo.png'
import SearchBar from '../pages/projects_board/SearchBar';

export default function Navbar({ OpenSideBar }) {
  const { documents, error } = useCollection("projects");
  const [query, setQuery] = useState([]);


  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const projectSearchList = documents && documents.map((document) => ({name: document.name, docId: document.id}))

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
            <img src={Logo} alt="promanagemt logo" />
            <span>ProManagement</span>
        </li>

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}

        {user && (
          <div className="left-nav-container">
            <div className="search-container">
              <SearchBar data={projectSearchList} query={query} setQuery={setQuery}/>
            </div>
            <Avatar src={user.photoURL}/>
            <h4>{user.displayName}</h4>
            <li>
                {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                {isPending && <button className="btn" disable>Logging out..</button>}
            </li>
          </div>
        )}
      </ul>
    </div>
  )
}
