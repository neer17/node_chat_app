//  this establishes a connection to socket.io for the client
var socket = io();

function scrollToBottom(){
    //  selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    //  heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollHeight + newMessageHeight >= scrollHeight)
        messages.scrollTop(scrollHeight);
}

        
socket.on('connect', () => {
    
    let params = jQuery.deparam(window.location.search);
    console.log('parameters are ', params);
    
    
    //  custom event
    socket.emit('join', params, function(err){
        if(err)
          alert(err);
        else
        console.log('No errors');
    });
});        

socket.on('disconnect', () => {
    console.log('Disconnected from the server ');
    
});


socket.on('updateUserList', (users) => {
    
    //  getting the array of username in "users" 
    //  and appending the name in the list
    var ol = jQuery('<ol></ol>');

    users.forEach((user) => {
        ol.append(jQuery('<li></li>').text(user))
    });

    jQuery('#users').html(ol);
});
//  creating a listener
socket.on('newMessage', function(newMessage){

    let formattedTime = moment(newMessage.createdAt).format('h:mm a');

    //  getting the html from the script
    var template = jQuery('#message-template').html();

    var html = Mustache.render(template, {
        message: newMessage.message,
        from: newMessage.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();
});


socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-template').html();
    
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    scrollToBottom();
});


//  creating an event listener which will use JQuery

//  when form is submitted from the browser then that event will be listend by the below listener
//  "submit" is the listener provided by JQuery and gets activated when a form is submitted

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();    //  this will enforce the default functionality of refreshing of browser when a form is sumbitted

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        message: messageTextbox.val()
    }, function(){
        //  this is for acknowledegement
        
        //  setting value of the textbox to '' after hitting send button
        messageTextbox.val('');
    });
});

//  sending location 
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    
    locationButton.attr('disabled', 'disabled').text('Sending Location....');

    if(!navigator.geolocation)
      return alert('Browser does not support location services ');

    navigator.geolocation.getCurrentPosition(function(position){
        
        //  on success
        locationButton.removeAttr('disabled').text('Send Location')

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Send Location');

        alert('Permission denied!');
    });  
});