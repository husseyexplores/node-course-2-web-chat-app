const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname + "./../public");
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New user connected.');

   socket.emit('newMessage', {
      from: 'Hussey',
      text: 'Hey! What is going on',
      createdAt: 123
   });

   socket.on('createMessage', (message) => {
      console.log('createMessage', JSON.stringify(message, undefined, 2));
   });

   socket.on('disconnect', () => {
      console.log('User dropped.');
   });
});

server.listen(port, () => {
   console.log(`Web Chat App started successfully on ${port}`)
});