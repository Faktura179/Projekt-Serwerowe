var express = require("express")
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);

app.use(express.static("static"))

socketio.on('connection', function (client) {
    console.log("klient się podłączył " + client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io

});

http.listen(3000, function () {
    console.log('listening on 3000');
});

