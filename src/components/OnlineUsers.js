import React from 'react'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
    const { error, documents} = useCollection('users');

  return (
    <div className="user-list">
      <h2>All Users</h2>
        {/* {error & <div className="error">{error}</div>} */}
        {/* Need to ensure document is not null first */}
        {documents && documents.map((user) => (
            <div key={user.id} className="user-list-item">
                <div className="avatar-online-container">
                    {user.online && <span className="online-user"></span>}
                    <Avatar src={user.photoURL}/>
                </div>
                <span>{user.displayName}</span>
            </div>
        ))}
    </div>
  )
}
