class Player extends THREE.Object3D {
    constructor(modelSrc, textureSrc, scale, position, rotationy) {
        super()
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
        this.moves = ilePol - 1
        this.pos++
        this.nextBlock = game.board.pola[this.pos]
        this.isMoving = true
    }
    noMove() {
        this.moves = 0
        //this.pos++
        this.nextBlock = game.board.pola[this.pos]
        this.isMoving = true
    }
    stand() {
        console.log("stop")
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
                    this.position.x = game.board.pola[this.pos - 1].position.x
                    this.position.y = game.board.pola[this.pos - 1].position.y
                    this.position.z = game.board.pola[this.pos - 1].position.z
                    this.pos = this.pos - 1
                    this.isMoving = false
                    this.moves = 0
                    this.nextBlock = game.board.pola[this.pos]
                }
            }
            else if (this.nextBlock.specialActionDescription.length == 4) {
                if (this.nextBlock.specialActionDescription[0] == "+") {
                    var amount = parseInt(this.nextBlock.specialActionDescription[1])
                    this.extraRolls += amount
                    net.changeExtraRolls({ extra: amount })
                }
                else {
                    var amount = parseInt(this.nextBlock.specialActionDescription[1])
                    amount = amount * -1
                    if (this.extraRolls >= 0) {
                        console.log("HALO")
                        console.log(this.extraRolls)
                        this.extraRolls += amount
                        net.changeExtraRolls({ extra: amount })
                    }
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
    }

}