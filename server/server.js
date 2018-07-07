const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validator');
const {generateMessage, generateLocationDetails} = require('./utils/message');
const {User} = require('./utils/users');

var app = express();

var publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//  instance of User class
var users = new User();

//  creating a http server
var server = http.createServer(app);

var io = socketIO(server);

//  event listener in socket.io
io.on('connection', function(socket) {

    //  

    //  creating a listener
    socket.on('createMessage', function(message, callback){
        
        //  this will emit the data to all the clients
        io.emit('newMessage', generateMessage(message.from, message.message));

        callback('This is from the server');
    });

    //  registering a new listener for location 
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationDetails('Admin', coords.latitude, coords.longitude));
    });

    //  listener for "join"
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room))
          return callback('name and room are required');

        //  joining a room
        //  property from socket.io
        socket.join(params.room);

        users.removeUser(socket.id);
        users.generateUser(socket.id, params.name, params.room);

        //  sending list of users of a particular room to the listener
        io.to(params.room).emit('updateUserList', users.generateList(params.room));

        console.log(`${params.room} and ${params.name}`);
          

        //  creating a listener
        socket.emit('newMessage',generateMessage('Admin', 'Hi this is Admin'));

        //  broadcasting an event
        //  it will be sent to all the users but the current user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined `));

        //  when messages are being sent
        callback();
    });

    socket.on('disconnect', function(){
        var user = users.removeUser(socket.id);

        io.to(user.room).emit('updateUserList', users.generateList(user.room));
        io.emit(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    });

});








server.listen(port, () => {
    console.log(`server is up on port ${port}`); 
});
