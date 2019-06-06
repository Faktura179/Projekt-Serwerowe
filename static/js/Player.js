class Player extends THREE.Object3D {
    constructor(name, modelSrc, textureSrc, scale, position, rotationy) {
        super()
        this.name = name
        this.pos = 0
        this.nextBlock
        this.moves = 0
        this.isMoving = false
        this.extraValue = 0
        this.extraRolls = 0
        var that = this
        var loader = new THREE.OBJLoader();
        loader.load(
            // resource URL
            modelSrc,
            // called when resource is loaded
            function (object) {
                var texture = new THREE.TextureLoader().load(textureSrc);
                var material = new THREE.MeshPhongMaterial({ map: texture });
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });
                object.scale.set(scale, scale, scale)
                object.position.copy(position)
                object.rotation.y += rotationy
                that.obj = object
                that.add(object);

            },
            // called when loading is in progresses
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened');

            }
        );
    }

    move(ilePol) {
        if (this.pos + ilePol <= 33) {
            this.moves = ilePol - 1
            this.pos++
            this.nextBlock = game.board.pola[this.pos]
            this.isMoving = true
        }
        else {
            ilePol = 34 - this.pos
            this.moves = ilePol - 1
            this.pos++
            this.nextBlock = game.board.pola[this.pos]
            this.isMoving = true
        }
    }
    noMove() {
        this.moves = 0
        //this.pos++
        this.nextBlock = game.board.pola[this.pos]
        this.isMoving = true
    }
    stand() {
        console.log("stop")
        if (this.pos == 34 && game.winner == false) {
            window.alert("Zwycięzcą jest " + this.name)
            game.winner = true

        }
        if (game.winner == false) {
            if (this.nextBlock.specialAction == true) {
                if (this.nextBlock.specialActionDescription.length == 2) {
                    if (parseInt(this.nextBlock.specialActionDescription) > 0) {
                        var howMuch = parseInt(this.nextBlock.specialActionDescription)
                        this.move(howMuch)
                        console.log("_______")
                        console.log(this)
                        //net.moveBonus({ ilePol: howMuch })
                    }
                    else {
                        var howMuch = parseInt(this.nextBlock.specialActionDescription)
                        this.position.x = game.board.pola[this.pos + howMuch].position.x
                        this.position.y = game.board.pola[this.pos + howMuch].position.y
                        this.position.z = game.board.pola[this.pos + howMuch].position.z
                        this.pos = this.pos + howMuch
                        this.isMoving = false
                        this.moves = 0
                        this.nextBlock = game.board.pola[this.pos]
                    }
                }
                else if (this.nextBlock.specialActionDescription.length == 5) {
                    if (this.nextBlock.specialActionDescription[0] == "+") {
                        this.extraValue += 1
                        net.changeExtraValue({ extra: 1 })
                    }
                    else {
                        this.extraValue -= 1
                        net.changeExtraValue({ extra: -1 })
                    }
                }
            }
            else if (this.nextBlock.specialActionDescription.length == 4) {
                if(this.nextBlock.specialActionDescription[0]=="+"){
                    if(this.num==net.player){
                    var currentNumber = Math.floor(Math.random() * 6) + 1
                    game.currentNumber = currentNumber
                    currentNumber += game.players[net.player].extraValue
                    game.rolling = true
                    setTimeout(function () {
                        game.rolling = false
                        if (game.players[net.player].extraRolls == 0) {
                            console.log("+roll")
                            this.move(currentNumber)
                            net.move({ ilePol: currentNumber })
                        }
                    }.bind(this), 2000)}
                }else{
                    
                }
            }
        }
    }
}
