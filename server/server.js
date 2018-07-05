const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationDetails} = require('./utils/message');

var app = express();

var publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//  creating a http server
var server = http.createServer(app);

var io = socketIO(server);

//  event listener in socket.io
io.on('connection', function(socket) {
    console.log('New user added');

    //  creating a listener
    socket.emit('newMessage',generateMessage('Admin', 'Hi this is Admin'));

    //  broadcasting an event
    //  it will be sent to all the users but the current user
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', function(){
        console.log('Disconected from the client');
    });

    //  

    //  creating a listener
    socket.on('createMessage', function(message, callback){
        console.log(message);
        
        //  this will emit the data to all the clients
        io.emit('newMessage', generateMessage(message.from, message.message));

        callback('This is from the server');
    });

    //  registering a new listener for location 
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationDetails('Admin', coords.latitude, coords.longitude));
    });

});








server.listen(port, () => {
    console.log(`server is up on port ${port}`); 
});
