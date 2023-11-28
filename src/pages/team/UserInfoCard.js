// components
import Avatar from '../../components/Avatar'

const UserInfoCard = ({ user }) => {
  return (
    <div key={user.id} className="user-list-item">
      <div className="avatar-online-container">
        {user.online && <span className="online-user"></span>}
        <Avatar src={user.photoURL} />
      </div>
      <span>{user.displayName}</span>
      <span>{user.department.label}</span>
      <span>{user.role}</span>
      <h3>Projects: </h3>
    </div>
  );
};

export default UserInfoCard;
