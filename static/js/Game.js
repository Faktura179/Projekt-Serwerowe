class Game {
    constructor() {
        this.a = 0
        this.b = 0
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
        function render() {


            //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
            //np zmieniająca się wartość rotacji obiektu

            //mesh.rotation.y += 0.01;

            //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny

            requestAnimationFrame(render);

            // potwierdzenie w konsoli, że render się wykonuje

            //console.log("render leci")

            //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą

            renderer.render(scene, camera);
        }
        render()
        var plansza = new Board()
        scene.add(plansza)
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });
        // var objectLoader = new THREE.ObjectLoader();
        // objectLoader.load("models/mars-rover-spirit-opportunitymtl.json", function (obj) {
        //     scene.add(obj);
        // });
        var loader = new THREE.OBJLoader();
        loader.load(
            // resource URL
            'models/robot-birdface-21.obj',
            // called when resource is loaded
            function (object) {

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