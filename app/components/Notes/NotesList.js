import React, { PropTypes } from 'react';

const NotesList = ({ notes }) => {
  return (<div>
    <ul className="list-group">
      {notes.map((item, index) => (
          <li className="list-group-item"
            key={index}
          >
        {item}
      </li>
    ))
  }
    </ul>
  </div>);
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NotesList;
