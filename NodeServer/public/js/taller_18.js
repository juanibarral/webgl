import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})
renderer.shadowMap.enabled = true

const controls = new OrbitControls( camera, renderer.domElement )

// Materials
const whiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF})
const redMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000})
const greenMaterial = new THREE.MeshPhongMaterial({color: 0x00FF00})
const blueMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF})

// Piso
const floorGeometry = new THREE.PlaneGeometry(10, 10)
const floor = new THREE.Mesh(floorGeometry, whiteMaterial)
floor.receiveShadow = true
floor.rotation.x = -Math.PI / 2
scene.add(floor)

// Esfera
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
const sphere = new THREE.Mesh(sphereGeometry, greenMaterial)
sphere.castShadow = true
sphere.position.y = 1
scene.add(sphere)

// Cubo
const cubeGeometry = new THREE.BoxGeometry()
const cube = new THREE.Mesh(cubeGeometry, redMaterial)
cube.rotation.y = 15 * Math.PI / 180
cube.position.y = 0.5
cube.position.z = -2
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)

// Cono
const coneGeometry = new THREE.ConeGeometry(1, 3, 10)
const cone = new THREE.Mesh(coneGeometry, blueMaterial)
cone.position.y = 1
cone.position.x = 2
cone.castShadow = true
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

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
controls.update()

const animate = function () {
    requestAnimationFrame( animate );
    controls.update()
    renderer.render( scene, camera );
};

animate();