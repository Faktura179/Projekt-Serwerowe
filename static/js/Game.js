class Game {
    constructor() {
        var that = this
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery (FOV - field of view)
            16 / 9,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        this.rolling = false
        camera.position.set(1000, 1000, 1000)
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
        scene.add(camera)
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xffffff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(renderer.domElement);

        var plansza = new Board()
        this.board = plansza
        var players=[]
        this.players=players
        players.push(new Player('models/mustang/1967-shelby-ford-mustang.obj','models/mustang/bodybkgd.jpg',8,new THREE.Vector3(0, 3, -25),Math.PI * 3 / 2))
        players.push(new Player('models/porshe/Porsche_911_GT2.obj','models/porshe/skinhp/0000.bmp',16,new THREE.Vector3(0, 13, 25),Math.PI * 3 / 2))
        players.forEach(el=>{
            el.nextBlock=this.board.pola[0]
            scene.add(el)
        })

        function render() {

            players.forEach(el=>{
                var directionVect = el.nextBlock.position.clone().sub(el.position).normalize()
                if(el.position.clone().distanceTo(el.nextBlock.position)>10){
                    el.translateOnAxis(directionVect, 5)
                }else{
                    if(el.moves>0){
                        el.moves--
                        el.pos++
                        el.nextBlock=game.board.pola[el.pos]
                        if(el.pos%9==8 || (el.pos%9==1 && el.pos>1)){
                            el.obj.rotation.y+=Math.PI/2
                        }
                    }else{
                        if(el.isMoving){
                            if(el.pos%9==7 || (el.pos%9==0 && el.pos>0)){
                                el.obj.rotation.y+=Math.PI/2
                            }
                            el.stand()
                            el.isMoving=false
                        }
                    }
                }
            })
            

            requestAnimationFrame(render);

            // potwierdzenie w konsoli, że render się wykonuje

            //console.log("render leci")

            //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą
            if (that.rolling == true) {
                that.dice.rotation.x = Math.PI / 4
                that.dice.rotation.y += 0.4
                that.dice.rotation.z += 0.1
            }
            else if (that.rolling == false && that.dice != undefined) {
                that.dice.rotation.x = 0
                that.dice.rotation.y = 0
                that.dice.rotation.z = 0
                if (game.currentNumber != undefined) {
                    if (game.currentNumber == 2) {
                        that.dice.rotation.z = Math.PI * 3 / 2
                    }
                    else if (game.currentNumber == 3) {
                        that.dice.rotation.x = Math.PI * 3 / 2
                    }
                    else if (game.currentNumber == 4) {
                        that.dice.rotation.x = Math.PI / 2
                    }
                    else if (game.currentNumber == 5) {
                        that.dice.rotation.z = Math.PI / 2
                    }
                    else if (game.currentNumber == 6) {
                        that.dice.rotation.z = Math.PI
                    }
                }
            }
            renderer.render(scene, camera);
        }
        render()
        
        scene.add(plansza)
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });




        var loader = new THREE.OBJLoader();
        loader.load(
            // resource URL
            'models/white-dice.obj',
            // called when resource is loaded
            function (object) {
                var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });
                that.dice = object
                that.rolling = false
                scene.add(object);
                object.scale.set(2, 2, 2)
                object.position.set(-300, 50, -300)

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

        // loader.load(
        //     // resource URL
        //     'models/mustang/1967-shelby-ford-mustang.obj',
        //     // called when resource is loaded
        //     function (object) {
        //         var texture = new THREE.TextureLoader().load('models/mustang/bodybkgd.jpg');
        //         var material = new THREE.MeshPhongMaterial({ map: texture });
        //         object.traverse(function (child) {
        //             if (child instanceof THREE.Mesh) {
        //                 child.material = material;
        //             }
        //         });
        //         object.scale.set(8, 8, 8)
        //         object.position.set(0, 3, -25)
        //         object.rotation.y += Math.PI * 3 / 2
        //         scene.add(object);

        //     },
        //     // called when loading is in progresses
        //     function (xhr) {

        //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        //     },
        //     // called when loading has errors
        //     function (error) {

        //         console.log('An error happened');

        //     }
        // );
        // loader.load(
        //     // resource URL
        //     'models/porshe/Porsche_911_GT2.obj',
        //     // called when resource is loaded
        //     function (object) {
        //         var texture = new THREE.TextureLoader().load('models/porshe/skinhp/0000.bmp');
        //         var material = new THREE.MeshPhongMaterial({ map: texture });
        //         object.traverse(function (child) {
        //             if (child instanceof THREE.Mesh) {
        //                 child.material = material;
        //             }
        //         });
        //         object.scale.set(16, 16, 16)
        //         object.position.set(0, 13, 25)
        //         object.rotation.y += Math.PI * 3 / 2
        //         scene.add(object);

        //     },
        //     // called when loading is in progresses
        //     function (xhr) {

        //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        //     },
        //     // called when loading has errors
        //     function (error) {

        //         console.log('An error happened');

        //     }
        // );
    }
}