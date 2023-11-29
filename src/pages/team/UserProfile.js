import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'



const UserProfile = () => {
    const { id } = useParams();
    const { error, document: user } = useDocument('users', id)

    console.log(document)

    if (error){
        return <div className="error">{error}</div>
      }
      if (!document){
        return <div className="loading">Loading...</div>
      }

  return (
    <div>
        {user && 
            <h2>{user.displayName}</h2>
        }
    </div>
  )
}

export default UserProfile
