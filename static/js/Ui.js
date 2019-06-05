class Ui {
    constructor() {
        window.onkeydown = function (e) {
            switch (e.key) {
                case "Enter":
                    if (game.rolling == false && net.myMove) {
                        net.myMove = false
                        var currentNumber = Math.floor(Math.random() * 6) + 1
                        game.currentNumber = currentNumber
                        console.log(currentNumber)
                        game.rolling = true
                        setTimeout(function () {
                            game.rolling = false
                            game.players[net.player].move(currentNumber)
                            net.move({ ilePol: currentNumber })
                        }, 2000)
                    }
                    break;
                case "h":
                    if (game.openHelp != undefined) {
                        if (game.openHelp == false) {
                            var info = document.createElement("div")
                            game.openHelp = true
                            info.innerText = "WITAJ W GRZE WYPRODUKOWANEJ PRZEZ FATUŁA&STRYCZEK. \n Aby wykonac ruch, w czasie swojego ruchu wciśnij Enter/Spację lub kliknij przycisk 'RUCH'.\n Celem gdy jest dotarcie do mety, niektore pola mogą ci to ułatwić bądź utrudnić."
                            info.id = "help"
                            var left = window.innerWidth
                            left = left / 2
                            left -= 325
                            info.style.left = left + "px"
                            document.body.appendChild(info)
                        }
                        else {
                            $("#help").remove()
                            game.openHelp = false
                        }
                    }
                    else {
                        var info = document.createElement("div")
                        game.openHelp = true
                        info.innerText = "WITAJ W GRZE WYPRODUKOWANEJ PRZEZ FATUŁA&STRYCZEK. \n Aby wykonac ruch, w czasie swojego ruchu kliknij Enter lub kliknij przycisk 'RUCH'.\n Celem gdy jest dotarcie do mety, niektore pola mogą ci to ułatwić bądź utrudnić."
                        info.id = "help"
                        var left = window.innerWidth
                        left = left / 2
                        left -= 325
                        info.style.left = left + "px"
                        document.body.appendChild(info)
                    }
                    break
                default:
                    console.log(e.key)
                    break;
            }
        }
        $("#move").on("click", function () {
            console.log("--------")
            console.log(game.players[net.player].extraRolls)
            console.log("---------")
            if (game.rolling == false && net.myMove && game.players[net.player].extraRolls == 0) {
                net.myMove = false
                //var currentNumber = Math.floor(Math.random() * 6) + 1
                var currentNumber = 4
                game.currentNumber = currentNumber
                currentNumber += game.players[net.player].extraValue
                game.rolling = true
                setTimeout(function () {
                    game.rolling = false
                    if (game.players[net.player].extraRolls == 0) {
                        console.log("BEZ OPOZNIENIA")
                        game.players[net.player].move(currentNumber)
                        net.move({ ilePol: currentNumber })
                    }
                }, 2000)
            }
            else {
                if (game.players[net.player].extraRolls < 0) {
                    console.log("OPÓŹNIENIE")
                    net.myMove = false
                    game.players[net.player].extraRolls += 1
                    game.players[net.player].noMove()
                    net.move({ ilePol: 0 })
                }
            }
        })
    }
}