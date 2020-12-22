import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})
renderer.shadowMap.enabled = true

const controls = new OrbitControls( camera, renderer.domElement )

// Materials
const yellowMaterial = new THREE.MeshPhongMaterial({color: 0xFFFF00})
const redMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000})
const greenMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00})
const blueMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF})

// Piso
const floorGeometry = new THREE.PlaneGeometry(10, 10)
const floor = new THREE.Mesh(floorGeometry, yellowMaterial)
floor.rotation.x = -Math.PI / 2
floor.userData = {defaultColor: 0xFFFF00}
scene.add(floor)

// Esfera
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
const sphere = new THREE.Mesh(sphereGeometry, greenMaterial)
sphere.position.y = 1
sphere.userData = {defaultColor: 0x00FF00}
scene.add(sphere)

// Cubo
const cubeGeometry = new THREE.BoxGeometry()
const cube = new THREE.Mesh(cubeGeometry, redMaterial)
cube.rotation.y = 15 * Math.PI / 180
cube.position.y = 0.5
cube.position.z = -2
cube.userData = {defaultColor: 0xFF0000}
scene.add(cube)

// Cono
const coneGeometry = new THREE.ConeGeometry(1, 3, 10)
const cone = new THREE.Mesh(coneGeometry, blueMaterial)
cone.position.y = 1
cone.position.x = 2
cone.userData = {defaultColor: 0x0000FF}
scene.add(cone)

// Iluminación
// Parámetros
const color = 0xFFFFFF
const intensity = 1

// Luz direccional
const directionalLight = new THREE.DirectionalLight(color, intensity)
directionalLight.castShadow = true
directionalLight.position.set(0, 4, 4)
directionalLight.target.position.set(0, 0, 0)
directionalLight.target.updateMatrixWorld()

scene.add(directionalLight)
scene.add(directionalLight.target)

// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
controls.update()

const raycaster = new THREE.Raycaster()
let pickedObject
const mouse = new THREE.Vector2();
function onMouseMove (event) {
    // Calculate mouse position in pixels inside canvas
    var rect = canvas.getBoundingClientRect();
    const pixX = (event.clientX - rect.left) / canvas.width
    const pixY = (event.clientY - rect.top) / canvas.height

    // Interpolacion lineal  x1 0, x2 1, y1 1, y2 -1
    // y = y1 + (x - x1)*(y2-y1)/(x2-x1)
    const x = -1 + (pixX*2)
    const y = 1 + (pixY*-2)

    mouse.x = x
    mouse.y = y
}

const animate = function () {
    raycaster.setFromCamera( mouse, camera );
    requestAnimationFrame( animate );

    // Reset all colors
    scene.traverse((c) => {
        if (c instanceof THREE.Mesh) {
            if (Object.keys(c.userData).length != 0) {
                c.material.color.set(c.userData['defaultColor'])
            }
        }
    })
    const intersects = raycaster.intersectObjects( scene.children );
	for ( let i = 0; i < intersects.length; i ++ ) {
        intersects[ i ].object.material.color.set( 0xaaaaaa );
    }
    
    controls.update()
    renderer.render( scene, camera );
};

animate();

window.addEventListener( 'mousemove', onMouseMove, false );