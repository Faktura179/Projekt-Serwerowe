var express = require("express")
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);

app.use(express.static("static"))
var players = []

socketio.on('connection', function (client) {
    console.log("klient się podłączył " + client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io
    if(players.length<2){
        players.push(client.id)
    }

    socketio.emit("conn",{player:players.length})

    client.on("move", function (data) {
        client.broadcast.emit("move", data)
    })
    client.on("disconnect", function () {
        if(players.indexOf(client.id)!==-1){
            players=[]
            socketio.emit("win",{})
        }
        console.log("Client sie rozałączył")
    })
});

http.listen(3000, function () {
    console.log('listening on 3000');
});

