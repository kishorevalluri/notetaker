import React, { PropTypes } from 'react';

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    const newNote = this.note.value;
    this.note.value = '';
    this.props.addNote(newNote);
  }
  render() {
    return (
      <div className="input-group">
        <input type="text"
          className="form-control"
          placeholder="Add New Note"
          ref = {(ref) => {this.note = ref;}}
        />
      <span className="input-group-btn">
        <button className="btn btn-default"
          type="button"
          onClick={this.handleSubmit.bind(this)}
        >
        Submit
      </button>
      </span>
    </div>);
  }
}

AddNote.propTypes = {
  username: PropTypes.string.isRequired,
  addNote: PropTypes.func.isRequired,
};
