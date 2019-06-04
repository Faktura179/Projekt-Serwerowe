var game
var ui
var net
$(document).ready(function () {
    game = new Game()
    ui = new Ui()
    net = new Net()
    $("#move").focus()
}) 