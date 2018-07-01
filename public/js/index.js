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
});