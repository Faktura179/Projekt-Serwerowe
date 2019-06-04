class Ui {
    constructor() {
        window.onkeydown = function (e) {
            switch (e.key) {
                case "Enter":
                    if (game.rolling == false && net.myMove) {
                        net.myMove=false
                        var currentNumber = Math.floor(Math.random() * 6) + 1
                        game.currentNumber = currentNumber
                        console.log(currentNumber)
                        game.rolling = true
                        setTimeout(function () {
                            game.rolling = false
                            game.players[net.player].move(currentNumber)
                            net.move({ilePol:currentNumber})
                        }, 2000)
                    }
                    break;
                case "h":
                    var info = document.createElement("div")
                    info.innerText = "WITAJ W GRZE WYPRODUKOWANEJ PRZEZ FATUŁA&STRYCZEK \n Aby wykonac ruch, w czasie swojejego ruchu kliknij enter lub kliknij przycisk 'RUCH'.\n Celem gdy jest dotarcie do mety, niektore pola mogą ci to ułatwić bądź utrunić"
                    info.id = "help"
                    document.body.appendChild(info)
                    break
                default:
                    console.log(e.key)
                    break;
            }
        }
    }
}