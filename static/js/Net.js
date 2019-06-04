class Net {
    constructor() {
        var socket
        socket = io()
        this.io = socket
        this.myMove = false
        socket.on("conn", function (data) {
            console.log(data)
            this.player = data.player - 1
            if (this.player == 0) {
                this.myMove = true
            } else {
                alert("Czekaj na ruch przeciwnika")
            }
            console.log(this.myMove)
        }.bind(this))
        socket.on("win", function (data) {
            socket.emit("win", {})
            alert("Wygrałeś!")
        })
        socket.on("move", function (data) {
            this.myMove = true
            if (this.player == 0) {
                game.players[1].move(data.ilePol)
            } else {
                game.players[0].move(data.ilePol)
            }
        }.bind(this))
    }

    move(argumenty) {
        this.io.emit("move", argumenty)
    }
}