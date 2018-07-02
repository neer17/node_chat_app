var socket = io();

        
socket.on('connect', () => {
    console.log('Connected to the server ');
});        

socket.on('disconnect', () => {
    console.log('Disconnected from the server ');
    
});

//  creating a listener
socket.on('newMessage', function(newMessage){
    console.log(newMessage);

    //  when the data comes from the client
    //  setting that data into the list using jQuery
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.message}`)

    jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Position</a>');

    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
    
    jQuery('#messages').append(li);
});

//  creating an event listener which will use JQuery

//  when form is submitted from the browser then that event will be listend by the below listener
//  "submit" is the listener provided by JQuery and gets activated when a form is submitted

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();    //  this will enforce the default functionality of refreshing of browser when a form is sumbitted

    socket.emit('createMessage', {
        from: 'User',
        message: jQuery('[name=message]').val()
    }, function(){

    });
});

//  sending location 
jQuery('#send-location').on('click', function(){
    
    if(!navigator.geolocation)
      return alert('Browser does not support location services ');

    navigator.geolocation.getCurrentPosition(function(position){
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        alert('Permission denied!');
    });  
});