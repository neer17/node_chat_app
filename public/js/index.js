//  this establishes a connection to socket.io for the client
var socket = io();

// const moment = require('moment');

        
socket.on('connect', () => {
    console.log('Connected to the server ');
});        

socket.on('disconnect', () => {
    console.log('Disconnected from the server ');
    
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

    // //  when the data comes from the client
    // //  setting that data into the list using jQuery
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from}:  ${formattedTime} : ${newMessage.message}`)

    // jQuery('#messages').append(li);
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

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Position</a>');

    // li.text(`${message.from} : ${formattedTime}`);
    // a.attr('href', message.url);
    // li.append(a);

    // jQuery('#messages').append(li);
});


//  creating an event listener which will use JQuery

//  when form is submitted from the browser then that event will be listend by the below listener
//  "submit" is the listener provided by JQuery and gets activated when a form is submitted

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();    //  this will enforce the default functionality of refreshing of browser when a form is sumbitted

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
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