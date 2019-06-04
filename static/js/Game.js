class Game {
    constructor() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            45,    // kąt patrzenia kamery (FOV - field of view)
            16 / 9,    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maxymalna renderowana odległość od kamery 
        );
        camera.position.set(1000, 1000, 1000)
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
        scene.add(camera)
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(renderer.domElement);

        var players=[]
        players.push(new Player())
        players.push(new Player())

        function render() {

            players.forEach(el=>{
                var directionVect = el.nextBlock.position.clone().sub(el.position).normalize()
                if(el.position.clone().distanceTo(el.nextBlock)>50){
                    el.translateOnAxis(directionVect, 5)
                }else{
                    if(el.moves>0){
                        el.moves--
                        el.pos++
                        el.nextBlock=game.board.pola[el.pos]
                    }else{
                        if(el.isMoving){
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

            renderer.render(scene, camera);
        }
        render()
        var plansza = new Board()
        this.borad = plansza
        scene.add(plansza)
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });




        // var objectLoader = new THREE.ObjectLoader();
        // objectLoader.load("models/mars-rover-spirit-opportunitymtl.json", function (obj) {
        //     scene.add(obj);
        //     obj.scale.set(0.4, 0.4, 0.4)
        // });

        var loader = new THREE.OBJLoader();
        loader.load(
            // resource URL
            'models/white-dice.obj',
            // called when resource is loaded
            function (object) {

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
        loader.load(
            // resource URL
            'models/mustang/1967-shelby-ford-mustang.obj',
            // called when resource is loaded
            function (object) {
                var texture = new THREE.TextureLoader().load('models/mustang/bodybkgd.jpg');
                var material = new THREE.MeshPhongMaterial({ map: texture });
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });
                object.scale.set(8, 8, 8)
                object.position.set(0, 3, -25)
                object.rotation.y += Math.PI * 3 / 2
                scene.add(object);

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
        loader.load(
            // resource URL
            'models/porshe/Porsche_911_GT2.obj',
            // called when resource is loaded
            function (object) {
                var texture = new THREE.TextureLoader().load('models/porshe/skinhp/0000.bmp');
                var material = new THREE.MeshPhongMaterial({ map: texture });
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                });
                object.scale.set(16, 16, 16)
                object.position.set(0, 13, 25)
                object.rotation.y += Math.PI * 3 / 2
                scene.add(object);

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
}