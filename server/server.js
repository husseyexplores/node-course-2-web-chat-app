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

const timestamp = new Date().getTime();

io.on('connection', (socket) => {
   console.log('New user connected.');

   socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the Chat Ap',
      createdAt: timestamp
   });

   socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: timestamp
   });

   socket.on('createMessage', (message) => {
      console.log('createMessage', JSON.stringify(message, undefined, 2));

      io.emit('newMessage', {
         from: message.from,
         text: message.text,
         createdAt: timestamp
      });

      // socket.broadcast.emit('newMessage', {
      //    from:  message.from,
      //    text: message.text,
      //    createdAt: timestamp
      // });
   });

   socket.on('disconnect', () => {
      console.log('User dropped.');
   });
});

server.listen(port, () => {
   console.log(`Web Chat App started successfully on ${port}`)
});