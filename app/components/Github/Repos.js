import React, { PropTypes } from 'react';

const Repos = ({ repos }) => {
  console.log('Repos: ', repos);
  return (
    <div>
    <h3>User Repos</h3>
    <ul className="list-group">
      {repos && repos.map((repo, index) => (
        <li key={index}
          className="list-group-item"
        >
        {repo.html_url && <h4><a href="repo.html_url">{repo.name}</a></h4>}
        {repo.description && <p>{repo.description}</p>}
      </li>))
    }
    </ul>
  </div>);
};

Repos.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
};

export default Repos;
