class Ui {
    constructor() {
        window.onkeydown = function (e) {
            switch (e.key) {
                case "Enter":
                    if (game.rolling == false) {
                        var currentNumber = Math.floor(Math.random() * 6) + 1
                        game.currentNumber = currentNumber
                        console.log(currentNumber)
                        game.rolling = true
                        setTimeout(function () {
                            game.rolling = false
                        }, 2000)
                    }
                    break;
                case "h":
                    console.log("pomoc")
                    var info = $("<DIV>")
                    info.text("WITAJ W GRZE WYPRODUKOWANEJ PRZEZ FATUŁA&STRYCZEK \n Aby wykonac ruch, w czasie swojejego ruchu kliknij enter lub ")
                    break
                default:
                    console.log(e.key)
                    break;
            }
        }
    }
}