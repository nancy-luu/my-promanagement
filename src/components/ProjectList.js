import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
// styles
import './ProjectList.css'


export default function ProjectList({ projects }) {
    
    return (
        <div className="project-list">
        { projects.length === 0 && <p>*No projects to display*</p>}
        {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
                <h4>{project.name}</h4>
                {/* dueDate is a firestore date object that must be converted */}
                <p>Due by {project.dueDate.toDate().toDateString()}</p>
                <div className="assigned-to">
                    <ul>
                        {project.assignedUsersList.map(user => (
                            <li key={user.photoUrl}>
                                <Avatar src={user.photoURL}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        ))}
    </div>
  )
}
