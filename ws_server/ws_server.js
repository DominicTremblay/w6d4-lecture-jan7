const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = process.env.port || 3001;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`WebSocket Server Running on Port: ${PORT}`);
});

const wss = new SocketServer.Server({ server });

const clientList = {};

// returns a color #a5d4e3 or silver;
const getColor = () => {
  // generate a random number
  const hex = uuidv1().slice(0, 6);
  return `#${hex}`;
};

// const getColor = () => {
//   const colors = ['lavender', 'slateblue', 'lime', 'wheat'];

//   const index = Math.floor(Math.random() * 3);

//   return colors[index];
// };

const sendClientInfo = (client, clientInfo) => {
  const message = {
    ...clientInfo,
    type: 'incomingClientInfo',
  };

  client.send(JSON.stringify(message));
};

const connectClient = (client, clientNb) => {
  // Generate an id for that client
  const clientId = uuidv1();

  client.id = clientId;

  clientList[clientId] = {
    id: clientId,
    username: `Anonymous${clientNb}`,
    color: getColor(),
  };
  console.log(`Client id: ${clientId} connected`);
  sendClientInfo(client, clientList[clientId]);
};

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', wsClient => {
  connectClient(wsClient, wss.clients.size);
  console.log(clientList);

  wsClient.on('message', message => {
    const clientMessage = JSON.parse(message);

    switch (clientMessage.type) {
      case 'postNotification':
        const outgoingMessage = {
          ...clientMessage,
          id: uuidv1(),
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
    delete clientList[wsClient.id];
    console.log(clientList);
  });
});
