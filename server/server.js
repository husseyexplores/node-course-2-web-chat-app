const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname + "./../public");
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname)))

const timestamp = new Date().getTime();

io.on('connection', (socket) => {

   socket.on('join', (params, callback) => {
      if (!isRealString(params.name) && !isRealString(params.room)) {
         callback('Display name and room nameare required.');
      }
      
      socket.join(params.room);

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

      callback();
   });

   socket.on('createMessage', (message, callback) => {
      console.log('createMessage', JSON.stringify(message, undefined, 2));

      io.emit('newMessage', generateMessage(message.from, message.text));
      callback();
   });

   socket.on('createLocationMessage', (coords) => {
      // io.emit('newMessage', generateMessage('Admin', `<a href="https://www.google.com/maps?q=${coords.latitude},${coords.longitude}">Look! here's my location.</a>`))
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
   })

   socket.on('disconnect', () => {
      console.log('User dropped.');
   });
});

server.listen(port, () => {
   console.log(`Web Chat App started successfully on ${port}`)
});