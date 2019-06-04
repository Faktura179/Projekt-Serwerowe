class Player extends THREE.Object3D{
    constructor(modelSrc, textureSrc, scale, position, rotationy){
        super()
        this.pos=0
        this.nextBlock
        this.moves=0
        this.isMoving=false

        var that= this
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
                object.scale.set(scale,scale,scale)
                object.position.copy(position)
                object.rotation.y += rotationy
                that.obj=object
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

    move(ilePol){
        this.moves=ilePol-1
        this.pos++
        this.nextBlock=game.board.pola[this.pos]
        net.move({ilePol:ilePol})
        this.isMoving=true
    }
    stand(){
        console.log("Stop")
        if(this.nextBlock/*is special*/){
            /*do something*/
        }
    }

}