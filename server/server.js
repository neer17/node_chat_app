const path = require('path');
const express = require('express');

var app = express();

var publicPath = path.join(__dirname, '../public');

var port = process.env.PORT;


app.use(express.static(publicPath));



app.listen(3000, () => {
    console.log(`server is up on port ${port}`); 
});
