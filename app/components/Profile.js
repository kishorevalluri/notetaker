'use strict';
import React from 'react';
import Notes from './Notes/Notes';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Firebase from 'firebase';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://sizzling-inferno-5769.firebaseio.com/');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }
  componentDidMount() {
    this.init(this.props.params.username);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps:  ', nextProps);
    base.removeBinding(this.ref);
    this.init(nextProps.params.username);
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  init(username) {
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    getGithubInfo(username)
      .then((data) => this.setState({
        bio: data.bio,
        repos: data.repos
      }));
  }
  onAddNote(newNote) {
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    });
  }
  render() {
    console.log(this.props);
    return (
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
    );
  }
}
