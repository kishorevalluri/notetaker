'use strict';
import React, {PropTypes} from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

const Notes = ({username, notes, addNote}) => {
  console.log('Notes: ', notes);
  return (
    <div>
      <h3>Notes for {username}</h3>
      <AddNote username={username}
          addNote={addNote}
      />
      <NotesList notes={notes}/>
  </div>);
};

Notes.propTypes = {
  username: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired,
  addNote: PropTypes.func.isRequired
};

export default Notes;
