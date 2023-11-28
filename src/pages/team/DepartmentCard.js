import { useCollection } from '../../hooks/useCollection'

// components
import Avatar from '../../components/Avatar'

const DepartmentCard = ({ department }) => {
    const { documents: userDocuments } = useCollection('users');

  return (
    <div className="department-card-container">
        <h2>{department.label}</h2>

    </div>
  )
}

export default DepartmentCard
