import HeaderDash from "../components/HeaderDash";
import PropTypes from "prop-types";

const Profile = ({ user }) => {
  return (
    <>
      <HeaderDash />
      <div className="p-6 mx-4 bg-white rounded-lg shadow-md max-w-screen">
        <h2 className="mb-4 text-2xl font-bold">User Profile</h2>
        <div className="mb-4">
          <span className="font-semibold">Name:</span>
          <p>{user.name}</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Email:</span>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Last Logged In:</span>
          <p>{new Date(user.lastLoggedIn).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Designation:</span>
          <p>{user.designation}</p>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Gender:</span>
          <p>{user.gender}</p>
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    lastLoggedIn: PropTypes.string,
    designation: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default Profile;
