import React, { Component } from 'react';
import './App.css';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { username: '', online: false },
    };
  }

  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socketServer = new WebSocket(url);

    this.socketServer.onopen = event => {
      this.setState({
        currentUser: { ...this.state.currentUser, online: true },
      });
      this.socketServer.send(
        JSON.stringify({
          message: 'hello',
        })
      );
    };

    this.socketServer.onmessage = message => {};
  }

  render() {
    return (
      <Header
        username={this.state.currentUser.username}
        online={this.state.currentUser.online}
      />
    );
  }
}

export default App;
