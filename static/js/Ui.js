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
                default:
                    console.log(e.key)
                    break;
            }
        }
    }
}