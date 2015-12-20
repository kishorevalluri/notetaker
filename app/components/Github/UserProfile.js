import React, { PropTypes } from 'react';

const UserProfile = ({ bio }) => {
  console.log('User: ', bio);
  return (
    <div>
      <h3>USER</h3>
      {bio.avatar_url && <li className="list-group-item">
        <img className="img-rounded img-responsive"
          src={ bio.avatar_url }
        />
        </li>}
      {bio.name && <li className="list-group-item">Name: {bio.name}</li>}
      {bio.login && <li className="list-group-item">Login: {bio.login}</li>}
      {bio.email && <li className="list-group-item">Email: {bio.email}</li>}
      {bio.location && <li className="list-group-item">Location: {bio.location}</li>}
    </div>
  );
};

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  bio: PropTypes.object.isRequired,
};

export default UserProfile;
