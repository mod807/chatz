
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var localtunnel = require('localtunnel');
var tunnel = localtunnel(8080,function(err, tunnel) {
    if (err)
    // the assigned public url for your tunnel 
    // i.e. https://abcdefgjhij.localtunnel.me 
    tunnel.url;
console.log(tunnel.url);
});
tunnel.on('close', function() {
    // tunnels are closed 
});

app.get('/', function(req, res){
 res.sendfile('index.html');
});
users = [];
io.on('connection', function(socket){
 console.log('A user connected');
 socket.on('setUsername', function(data){
 console.log(data);
 if(users.indexOf(data) > -1){
 socket.emit('userExists', data + ' username is taken! Try some other username.');
 }
 else{
 users.push(data);
 socket.emit('userSet', {username: data});
 }
 });
 socket.on('msg', function(data){
 //Send message to everyone
 io.sockets.emit('newmsg', data);
 })
});
http.listen(3000, function(){
 console.log('listening on localhost:3000');
});

