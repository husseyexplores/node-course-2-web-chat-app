function scrollTobottom () {
  // $("html, body").animate({ scrollTop: $(document).height() }, 500);
   $("html, body").scrollTop($(document).height());
}
var socket = io();

socket.on('connect', function() {
   console.log('Connected to server.');

   M.toast({html: 'Connected to the server.', classes: 'rounded green', displayLength: 3000});
});

socket.on('disconnect', function() {
   console.log('Disconnected from the server.');
   M.toast({html: 'Disconnected from the server.', classes: 'rounded red', displayLength: 10000});
});

socket.on('newMessage', function (message) {
   // console.log('New message:', JSON.stringify(message, undefined, 2))
   var li = jQuery('<li class="message-item"></li>');
   li.html(`<span class="sender-name">${message.from}:</span> <span class="user-message">${message.text}</span>`);
   jQuery('#messages').append(li);

   // Scroll to bottom when a message is received
   scrollTobottom ();
});

socket.on('newLocationMessage', function (message) {
   var li = jQuery('<li class="message-item"></li>');
   var a = jQuery(`<a target="_blank">Check out my current location here!</a>`);
   
   li.html(`<span class="sender-name">${message.from}:</span> `);
   a.attr('href', message.url)
   li.append(a);
   jQuery('#messages').append(li);

   // Scroll to bottom when a message is received
   scrollTobottom ();
})

// jQuery 
jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   var msgTextBox = jQuery('[name=message]');

   socket.emit('createMessage', {
      from: 'User',
      text: msgTextBox.val()
   }, function () {
         msgTextBox.val('')
   });
  // $("#message-form").trigger("reset");
});

var locationBtn = jQuery('#send-location-btn');

locationBtn.on('click', function () {
   if (!navigator.geolocation) {

      // MaterializeCSS Toast
      return M.toast({html: 'Geolocation not supported by your browser :(', classes: 'rounded red', displayLength: 5000});
   }

   locationBtn.attr('disabled', 'disabled').text('Sending Location...');
  
   navigator.geolocation.getCurrentPosition(function (position) {
      //M.toast({html: `Lat: ${position.coords.latitude} Long: ${position.coords.longitude}`, classes: 'rounded light-blue', displayLength: 10000});
      socket.emit('createLocationMessage', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });

      locationBtn.removeAttr('disabled').text('Send Location');
   }, function(e) {
      M.toast({html: 'Unable to fetch your location :(', classes: 'rounded red', displayLength: 3000});
      locationBtn.removeAttr('disabled').text('Send Location');
   })
});