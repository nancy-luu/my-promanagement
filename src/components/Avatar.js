import { Link } from "react-router-dom";

// styles
import './Avatar.css'

export default function Avatar({ src, userId }) {
  return (
    <div className="avatar">
      {userId ?
        <Link to={`/team/user/${userId}`}>
          <img src={src} alt={`avatar ${src}`}/>
        </Link>
        :
        <img src={src} alt={`avatar ${src}`}/>
      }
    </div>
  )
}
