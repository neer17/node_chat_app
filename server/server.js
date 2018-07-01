const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();

var publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;
app.use(express.static(publicPath));

//  creating a http server
var server = http.createServer(app);

var io = socketIO(server);

//  event listener in socket.io

io.on('connection', (socket) => {
    console.log('New user added');

    socket.on('disconnect', () => {
        console.log('Disconected from the client');
    });
});







server.listen(port, () => {
    console.log(`server is up on port ${port}`); 
});
