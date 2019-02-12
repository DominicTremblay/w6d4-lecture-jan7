import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socketServer = new WebSocket(url);

    this.socketServer.onopen = event => {
      this.socketServer.send(
        JSON.stringify({
          message: 'hello',
        })
      );
    };
  }

  render() {
    return <h1>Awesome Chat</h1>;
  }
}

export default App;
