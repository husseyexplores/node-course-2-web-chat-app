const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname + "./../public");
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const users = new Users();

app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname)))

const timestamp = new Date().getTime();

io.on('connection', (socket) => {

   socket.on('join', (params, callback) => {
      if (!isRealString(params.name) && !isRealString(params.room)) {
         return callback('Display name and room nameare required.');
      }

      params.name = decodeURIComponent(params.name.replace(/\+/g, ' '));
      params.room = decodeURIComponent(params.room.replace(/\+/g, ' '));
      
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);
      
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room}`));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

      callback();
   });

   socket.on('createMessage', (message, callback) => {
      user = users.getUser(socket.id);
      if (user && isRealString(message.text)) {
         io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      }
     
      callback();
   });

   socket.on('createLocationMessage', (coords) => {
      // io.emit('newMessage', generateMessage('Admin', `<a href="https://www.google.com/maps?q=${coords.latitude},${coords.longitude}">Look! here's my location.</a>`))
      user = users.getUser(socket.id);
      if (user) {
         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }
   })

   socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);
      
      if (user) {
         user.name = decodeURIComponent(user.name.replace(/\+/g, ' '));
         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
         io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));

      }
   });
});

server.listen(port, () => {
   console.log(`Web Chat App started successfully on ${port}`)
});