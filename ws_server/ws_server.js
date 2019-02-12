const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = process.env.port || 3001;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`WebSocket Server Running on Port: ${PORT}`);
});

const wss = new SocketServer.Server({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', wsClient => {
  console.log('Client Connected');

  wsClient.on('message', message => {
    const clientMessage = JSON.parse(message);

    switch (clientMessage.type) {
      case 'postNotification':
        const outgoingMessage = {
          ...clientMessage,
          id: uuidv4(),
          type: 'incomingNotification',
        };
        wss.broadcast(JSON.stringify(outgoingMessage));
        break;
      default:
        console.log('Unknow Type of Message!');
    }
  });

  wsClient.on('close', () => {
    console.log('Client disconnected');
  });
});
