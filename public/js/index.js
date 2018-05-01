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
   li.html(`<span class="sender-name">${message.from}:</span> <span class="user-message">${message.text}</span>`);
   jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
   var li = jQuery('<li class="collection-item"></li>');
   var a = jQuery(`<a target="_blank">Check out my current location here!</a>`);
   
   li.html(`<span class="sender-name">${message.from}:</span> `);
   a.attr('href', message.url)
   li.append(a);
   jQuery('#messages').append(li);
})

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

var locationBtn = jQuery('#send-location-btn');

locationBtn.on('click', function () {
   if (!navigator.geolocation) {

      // MaterializeCSS Toast
      return M.toast({html: 'Geolocation not supported by your browser :(', classes: 'rounded red', displayLength: 5000});
   }
  
   navigator.geolocation.getCurrentPosition(function (position) {
      //M.toast({html: `Lat: ${position.coords.latitude} Long: ${position.coords.longitude}`, classes: 'rounded light-blue', displayLength: 10000});
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
   }, function(e) {
      M.toast({html: 'Unable to fetch your location :(', classes: 'rounded red', displayLength: 3000});
   })
});