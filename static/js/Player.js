class Player extends THREE.Object3D{
    constructor(){
        super()
        this.pos=0
        this.nextBlock=game.board.pola[0]
        this.moves=0
        this.isMoving=false

    }

    move(ilePol){
        this.moves=ilePol
        net.move({ilePol:ilePol})
        this.isMoving=true
    }
    stand(){

    }

}