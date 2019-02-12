const express = require('express');
const SocketServer = require('ws');

const PORT = process.env.port || 3001;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`WebSocket Server Running on Port: ${PORT}`);
});

const wss = new SocketServer.Server({ server });

wss.on('connection', wsClient => {
  console.log('Client Connected');

  wsClient.on('message', message => {
    console.log(message);
  });
});

wss.on('close', () => {
  console.log('Client disconnected');
});
