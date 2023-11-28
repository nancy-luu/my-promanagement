import { useCollection } from '../../hooks/useCollection'

// components
import Avatar from '../../components/Avatar'

const DepartmentCard = ({ department }) => {
    const { documents: userDocuments } = useCollection('users');

    const formattedDepartmentName = [...department][0].toUpperCase()+[...department].slice(1).join('')

  return (
    <div className="department-card-container">
        <h2>{formattedDepartmentName}</h2>

    </div>
  )
}

export default DepartmentCard
