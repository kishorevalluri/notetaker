'use strict';
import React, {PropTypes} from 'react';

export default class SearchGithub extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit() {
    const username = this.usernameRef.value;
    this.usernameRef.value = '';
    this.props.history.pushState(null, `/profile/${username}`);
  }
  render() {
    return (
      <div className="col-sm-12">
        <form onSubmit={() => this.handleSubmit()}>
          <div className="form-group col-sm-7">
            <input type="text"
                className="form-control"
                ref = {(ref) => this.usernameRef = ref}
            />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit"
                className="btn btn-block btn-primary"
            >
            Search Github
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchGithub.propTypes = {
  history: PropTypes.object.isRequired
};
