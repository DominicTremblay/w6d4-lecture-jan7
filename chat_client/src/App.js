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

  updateStatus = status => {
    this.setState({
      currentUser: { ...this.state.currentUser, online: status },
    });
  };

  sendUpdateUsername = (oldUsername, newUsername) => {
    const message = {
      type: 'postNotification',
      message: `${oldUsername ||
        'Anonymous'} has changed its name to ${newUsername}}`,
    };

    this.socketServer.send(JSON.stringify(message));
  };

  updateUsername = username => {
    this.sendUpdateUsername(this.state.currentUser.username, username);
    this.setState({
      currentUser: { ...this.state.currentUser, username: username },
    });
  };

  addNewNotification = msg => {
    const message = {
      id: msg.id,
      message: msg.message,
    };

    console.log(`adding ${JSON.stringify(message)}`);
  };

  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socketServer = new WebSocket(url);

    this.socketServer.onopen = event => {
      this.updateStatus(true);
    };

    this.socketServer.onmessage = message => {
      const serverMessage = JSON.parse(message.data);

      switch (serverMessage.type) {
        case 'incomingNotification':
          this.addNewNotification(serverMessage);
          break;
        default:
          console.log('Unknown message from server');
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header
          username={this.state.currentUser.username}
          online={this.state.currentUser.online}
          updateUsername={this.updateUsername}
        />
      </React.Fragment>
    );
  }
}

export default App;
