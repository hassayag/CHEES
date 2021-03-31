var express = require('express');
var app = express();
 
var server = require('http').createServer(app);
 
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
 
console.log("Server started.");

server.listen(4141);