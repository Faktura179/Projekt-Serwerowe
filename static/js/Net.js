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
            alert("Wygrałeś! Twój przeciwnik wyszedł z gry")
        })
        socket.on("move", function (data) {
            this.myMove = true
            if (data.ilePol != 0) {
                if (this.player == 0) {
                    game.players[1].move(data.ilePol)
                } else {
                    game.players[0].move(data.ilePol)
                }
            }
            else {
                if (this.player == 0) {
                    game.players[1].noMove()
                } else {
                    game.players[0].noMove()
                }
            }
        }.bind(this))
        // socket.on("moveBonus", function (data) {
        //     //this.myMove = true
        //     //console.log(data)
        //     if (this.player == 0) {
        //         game.players[1].move(data.ilePol)
        //     } else {
        //         game.players[0].move(data.ilePol)
        //     }
        // }.bind(this))
        socket.on("changing2", function (data) {
            if (this.player == 0) {
                game.players[1].extraValue += data.extra
            } else {
                game.players[0].extraValue += data.extra
            }
        }.bind(this))
        socket.on("highscores", function (data) {
            console.log(data)
            var wyniki = ""
            for (var i = 0; i < data.length; i++) {
                if (i >= 10) break;
                wyniki += i + ": " + data[i].ruchy + " moves\n"
            }
            console.log(wyniki)
            alert("Highscores:\n" + wyniki)
        })
    }

    move(argumenty) {
        this.io.emit("move", argumenty)
    }
    moveBonus(argumenty) {
        this.io.emit("moveBonus", argumenty)
    }
    changeExtraValue(change) {
        this.io.emit("changing", change)
    }
    win() {
        this.io.emit("win", {})
        this.io.emit("highscores", {})
    }
}