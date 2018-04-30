var socket = io();

socket.on('connect', function() {
   console.log('Connected to server.');

   socket.emit('createMessage', {
      from: 'Jen',
      text: 'Hey! This is hussey'
   });
});

socket.on('disconnect', function() {
   console.log('Disconnected from the server.');
});

socket.on('newMessage', function (message) {
   console.log('New message:', JSON.stringify(message, undefined, 2))
});