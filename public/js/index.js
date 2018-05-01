var socket = io();

socket.on('connect', function() {
   console.log('Connected to server.');

   // socket.emit('createMessage', {
   //    from: 'Jen',
   //    text: 'Hey! This is hussey'
   // });
});

socket.on('disconnect', function() {
   console.log('Disconnected from the server.');
});

socket.on('newMessage', function (message) {
   console.log('New message:', JSON.stringify(message, undefined, 2))
   var li = jQuery('<li class="collection-item"></li>');
   li.html(`<span class="sender">${message.from}:</span> <span class="message">${message.text}</span>`);
   jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'Hi'
// }, function (data) {
//    console.log('Got it.', data);
// });

// jQuery 
jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
   }, function () {

   });
   $("#message-form").trigger("reset");
});