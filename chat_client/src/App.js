import React, { Component } from 'react';
import './App.css';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { id: null, username: '', online: false, color: 'black' },
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

  updateClientInfo = ({ id, username, color }) => {
    this.updateUsername(username);
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        id,
        username,
        color,
      },
    });
  };

  handleOnOpen = event => {
    console.log(`Client connected`);
    this.updateStatus(true);
  };

  handleOnMessage = event => {
    const serverMessage = JSON.parse(event.data);

    switch (serverMessage.type) {
      case 'incomingClientInfo':
        this.updateClientInfo(serverMessage);
        break;
      case 'incomingNotification':
        this.addNewNotification(serverMessage);
        break;
      default:
        console.log('Unknown message from server');
    }
  };

  handleOnError = event => {
    console.log('Error', event);
  };

  handleOnClose = event => {
    console.log('Client disconnected');
  };

  closeConnection = () => {
    this.updateStatus(false);
    this.socketServer.close();
  };

  componentDidMount() {
    const url = 'ws://localhost:3001';
    this.socketServer = new WebSocket(url);

    this.socketServer.onopen = this.handleOnOpen;

    this.socketServer.onmessage = this.handleOnMessage;

    this.socketServer.onerror = this.handleOnError;

    this.socketServer.onclose = this.handleOnClose;
  }

  render() {
    return (
      <React.Fragment>
        <Header
          username={this.state.currentUser.username}
          online={this.state.currentUser.online}
          updateUsername={this.updateUsername}
          color={this.state.currentUser.color}
          closeConnection={this.closeConnection}
        />
      </React.Fragment>
    );
  }
}

export default App;
