import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
    };
  }

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = event => {
    if (event.key === 'Enter') {
      this.props.updateUsername(this.state.username);
      this.setState({ username: '' });
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={this.state.username}
          onChange={this.handleChange}
          onKeyUp={this.handleSubmit}
        />
      </div>
    );
  }
}

export default UserForm;
