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
        {departmentsTeam.length <= 1 ? 
          <p>{departmentsTeam.length} Team Member</p> 
          : 
          <p>{departmentsTeam.length} Team Members</p> 
        }
        <div className="team-avatars">
          {departmentsTeam && departmentsTeam.map((user) => (
            <Avatar src={user.photoURL}/>
          ))}
        </div>
    </div>
  )
}

export default DepartmentCard
