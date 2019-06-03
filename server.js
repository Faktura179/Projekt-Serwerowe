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
    

    console.log(players)
    client.emit("connect",{a:true, b: false})

    client.on("move", function (data) {
        client.broadcast.emit("move", data)
    })
    client.on("disconnect", function () {
        console.log("klient się rozłącza")
    })
});

http.listen(3000, function () {
    console.log('listening on 3000');
});

