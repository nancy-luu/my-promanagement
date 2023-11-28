import { useCollection } from '../../hooks/useCollection'

// components
import Avatar from '../../components/Avatar'

// style
import './Team.css'

const DepartmentCard = ({ department }) => {
    const { documents: userDocuments } = useCollection('users');
    
    const departmentsTeam = userDocuments ? userDocuments.filter((user) => user.department.value === department.value) : []
    console.log(departmentsTeam)

  return (
    <div className="department-card">
        <h3>{department.label}</h3>
        <div className="team-avatars">
          {departmentsTeam && departmentsTeam.map((user) => (
            <Avatar src={user.photoURL}/>
          ))}
        </div>
    </div>
  )
}

export default DepartmentCard
