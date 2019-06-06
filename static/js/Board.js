class Board extends THREE.Object3D {
    constructor() {
        super()
        this.pola = []
        for (let i = 0; i < 38; i++) {
            var geometry = new THREE.BoxGeometry(100, 5, 100);
            var material = new THREE.MeshPhongMaterial({
                //color: 0xff0000,
                specular: 0xffffff,
                shininess: 1,
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load("textures/grass.jpg"),
            })
            if (i == 37) {
                var material = new THREE.MeshPhongMaterial({
                    //color: 0xff0000,
                    specular: 0xffffff,
                    shininess: 1,
                    side: THREE.DoubleSide,
                    map: new THREE.TextureLoader().load("textures/win.jpg"),
                })
            }
            var cube = new THREE.Mesh(geometry, material);
            cube.position.y = 0
            cube.specialAction = false
            if (i == 4 || i == 8 || i == 13 || i == 16 || i == 21 || i == 28 || i == 31 || i == 35) {
                var material = new THREE.MeshPhongMaterial({
                    //color: 0xff0000,
                    specular: 0xffffff,
                    shininess: 1,
                    side: THREE.DoubleSide,
                    map: new THREE.TextureLoader().load("textures/special.jpg"),
                })
                cube = new THREE.Mesh(geometry, material);
                cube.specialAction = true
                if (i == 4) {
                    cube.specialActionDescription = "-2"
                }
                else if (i == 8) {
                    cube.specialActionDescription = "-1RR"
                }
                else if (i == 13) {
                    cube.specialActionDescription = "-2"
                }
                else if (i == 16) {
                    cube.specialActionDescription = "+1PPP"
                }
                else if (i == 21) {
                    cube.specialActionDescription = "-1PPP"
                }
                else if (i == 28) {
                    cube.specialActionDescription = "+1RR"
                }
                else if (i == 31) {
                    cube.specialActionDescription = "+1"
                }
                else if (i == 35) {
                    cube.specialActionDescription = "-9"
                }
            }
            else {
                cube.specialAction = false
            }
            if (i < 8) {
                cube.position.z = 0
                cube.position.x = i * 110
            }
            else if (i < 10) {
                if (i != 9) {
                    cube.position.z = (i - 7) * 110
                    cube.position.x = 770
                }

            }
            else if (i < 18) {
                cube.position.z = 220
                cube.position.x = (770 - (i - 10) * 110)
            }
            else if (i < 20) {
                if (i != 19) {
                    cube.position.z = (i - 17) * 110 + 220
                    cube.position.x = 0
                }
            }
            else if (i < 28) {
                cube.position.z = 440
                cube.position.x = ((i - 20) * 110)
            }
            else if (i < 30) {
                if (i != 29) {
                    cube.position.z = (i - 28) * 110 + 550
                    cube.position.x = 770
                }
            }
            else if (i < 38) {
                cube.position.z = 660
                cube.position.x = (770 - (i - 30) * 110)
            }
            cube.number = i + 1
            if (i != 9 && i != 19 && i != 29) {
                this.add(cube)
                this.pola.push(cube)
            }
        }
        var geometry = new THREE.PlaneGeometry(960, 850, 100);
        var material = new THREE.MeshPhongMaterial({
            //color: 0xff0000,
            specular: 0xffffff,
            shininess: 1,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("textures/sand.jpg"),
        })
        var plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = Math.PI / 2
        plane.position.x = 380
        plane.position.z = 330
        plane.position.y = -10
        this.add(plane);
        for (let i = 0; i < 4; i++) {
            var light = new THREE.DirectionalLight(0xffffff, 0.3);
            light.position.set(i * 200, 300, i * 300);
            light.lookAt(0, 0, 0);
            this.add(light);
        }
    }
}