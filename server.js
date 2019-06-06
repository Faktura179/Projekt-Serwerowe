var express = require("express")
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io')(http);
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var _db;

app.use(express.static("static"))
var players = []

// mongoClient.connect("mongodb://localhost/planszowka", function (err, db) {
//     if (err) console.log(err)
//     else console.log("mongo podłączone!")
//     //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
//     // pod zmienną widoczną na zewnątrz    
//     _db = db;
//     db.createCollection("gracze", function (err, coll) {
//     })
// })

socketio.on('connection', function (client) {
    console.log("klient się podłączył " + client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io
    if (players.length < 2) {
        players.push(client.id)
        // var coll = _db.collection("gracze")
        // coll.insert({ gracz: client.id, ruchy: 0 })
    }

    socketio.to(client.id).emit("conn", { player: players.length })

    client.on("move", function (data) {
        client.broadcast.emit("move", data)
        // var coll = _db.collection("gracze")
        // coll.updateOne(
        //     { gracz: client.id },
        //     { $inc: { ruchy: 1 } },
        //     function (err, data) {
        //         console.log("update: " + data)
        //     })
    })
    client.on("moveBonus", function (data) {
        client.broadcast.emit("moveBonus", data)
        // var coll = _db.collection("gracze")
        // coll.updateOne(
        //     { gracz: client.id },
        //     { $inc: { ruchy: 1 } },
        //     function (err, data) {
        //         console.log("update: " + data)
        //     })
    })
    client.on("win", function (data) {
        if (players.indexOf(client.id) !== -1) {
            // coll.updateOne(
            //     { gracz: client.id },
            //     { $set: { wygral: true } },
            //     function (err, data) {
            //         console.log("update: " + data)
            //     })
        }
    })
    client.on("changing", function (data) {
        client.broadcast.emit("changing2", data)
    })
    client.on("changingRolls", function (data) {
        client.broadcast.emit("changingRolls2", data)
    })
    client.on("highscores", function () {
        var coll = _db.collection("gracze")
        coll.find({ wygral: true }).sort({ ruchy: 1 }).toArray(function (err, result) {
            console.log(result)
            client.emit("highscores", result)
        })
    })
    client.on("disconnect", function () {
        if (players.indexOf(client.id) !== -1) {
            players = players.filter(el => el != client.id)
            socketio.to(players[0]).emit("win", {})
        }
        console.log("Client sie rozałączył")
    })
});

http.listen(3000, function () {
    console.log('listening on 3000');
});


