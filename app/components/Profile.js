import React, { PropTypes } from 'react';
import Notes from './Notes/Notes';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://sizzling-inferno-5769.firebaseio.com/');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: [],
      error: '',
    };
  }
  componentDidMount() {
    this.init(this.props.params.username);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps:  ', nextProps);
    console.log('this.ref:  ', this.ref);
    if (this.ref) {
      base.removeBinding(this.ref);
      delete this.ref;
    }
    this.init(nextProps.params.username);
  }
  componentWillUnmount() {
    if (this.ref) {
      base.removeBinding(this.ref);
      delete this.ref;
    }
  }

  onAddNote(newNote) {
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote]),
    });
  }
  init(username) {
    getGithubInfo(username)
      .then((data) => {
        this.setState({
          bio: data.bio,
          repos: data.repos,
          error: '',
        });
        this.ref = base.bindToState(username, {
          context: this,
          asArray: true,
          state: 'notes',
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        this.setState({
          notes: [],
          bio: {},
          repos: [],
          error: 'Not found..',
        });
      });
  }
  render() {
    console.log('Profile: ', this.props);
    console.log('State: ', this.state);
    return (
      this.state.error === '' ?
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username}
            bio = {this.state.bio}
          />
        </div>
        <div className="col-md-4">
          <Repos username = {this.props.params.username}
            repos = {this.state.repos}
          />
        </div>
        <div className="col-md-4">
          <Notes username = {this.props.params.username}
            notes = {this.state.notes}
            addNote = {(newNote) => this.onAddNote(newNote)}
          />
        </div>
      </div>
      : <div className="alert alert-danger">
          <strong>Error!</strong> {this.state.error}
        </div>
    );
  }
}

Profile.propTypes = {
  params: PropTypes.object.isRequired,
};
