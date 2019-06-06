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
                            info.innerText = "WITAJ W GRZE WYPRODUKOWANEJ PRZEZ FATUŁA&STRYCZEK. \n Aby wykonac ruch, w czasie swojego ruchu wciśnij Enter/Spację lub kliknij przycisk 'RUCH'.\n Celem gry jest dotarcie do mety, niektore pola mogą ci to ułatwić bądź utrudnić. \n"
                            info.id = "help"
                            var left = window.innerWidth
                            left = left / 2
                            left -= 325
                            info.style.left = left + "px"
                            var select = document.createElement("select")
                            select.id = "which"
                            var op = document.createElement("option")
                            op.value = null
                            op.id = "toRemove"
                            op.innerText = "-"
                            select.appendChild(op)
                            for (let i = 0; i < 35; i++) {
                                var option = document.createElement("option")
                                option.value = i + 1
                                option.innerText = i + 1
                                select.appendChild(option)
                            }
                            info.appendChild(select)
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
                        info.innerText = "WITAJ W GRZE WYPRODUKOWANEJ PRZEZ FATUŁA&STRYCZEK. \n Aby wykonac ruch, w czasie swojego ruchu wciśnij Enter/Spację lub kliknij przycisk 'RUCH'.\n Celem gry jest dotarcie do mety, niektore pola mogą ci to ułatwić bądź utrudnić. \n"
                        info.id = "help"
                        var left = window.innerWidth
                        left = left / 2
                        left -= 325
                        info.style.left = left + "px"
                        var select = document.createElement("select")
                        select.id = "which"
                        var op = document.createElement("option")
                        op.value = null
                        op.id = "toRemove"
                        op.innerText = "-"
                        select.appendChild(op)
                        for (let i = 0; i < 35; i++) {
                            var option = document.createElement("option")
                            option.value = i + 1
                            option.innerText = i + 1
                            select.appendChild(option)
                        }
                        info.appendChild(select)
                        document.body.appendChild(info)
                    }
                    $("#which").on("change", function () {
                        $("#toRemove").remove()
                        $("#infoAbout").remove()
                        var p = document.createElement("p")
                        p.id = "infoAbout"
                        var tabOfSpecialFields = [5, 9, 13, 16, 20, 27, 29, 33]
                        var normal = true
                        for (let i = 0; i < tabOfSpecialFields.length; i++) {
                            if ($("#which").val() == tabOfSpecialFields[i]) {
                                normal = false
                            }
                        }
                        if (normal == true) {
                            p.innerText = "Pole nr " + $("#which").val() + " jest zwyczajne."
                            document.getElementById("help").appendChild(p)
                        }
                        else {
                            if ($("#which").val() == 5) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje przesunięcie się o 2 pola do przodu."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 9) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje jeden dodatkowy rzut kostką."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 13) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje przesunięcie się o 2 pola do tyłu."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 16) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje dodanie jednego pola do ruchu na stałe."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 20) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje odjęcie jednego pola od ruchu na stałe."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 27) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje jeden dodatkowy rzut kostką."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 29) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje przesunięcie się o 1 pole do przodu."
                                document.getElementById("help").appendChild(p)
                            }
                            else if ($("#which").val() == 33) {
                                p.innerText = "Pole nr " + $("#which").val() + " powoduje przesunięcie się o 9 pól do tyłu."
                                document.getElementById("help").appendChild(p)
                            }
                        }
                    })
                    break
                default:
                    console.log(e.key)
                    break;
            }
        }
        $("#move").on("click", function () {
            if (game.winner == false) {
                if (game.rolling == false && net.myMove && game.players[net.player].extraRolls == 0) {
                    net.myMove = false
                    //var currentNumber = Math.floor(Math.random() * 6) + 1
                    var currentNumber = 6
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
            }
        })
    }
}