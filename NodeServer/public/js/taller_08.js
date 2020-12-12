import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const perspCamera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const w = 3
const h = 3
const orthoCamera = new THREE.OrthographicCamera(-w, w, h, -h, 0.1, 100)

let camera = orthoCamera

const renderer = new THREE.WebGLRenderer({canvas})

// Geometries
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
// Materials
const redMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } )
const yellowMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } )
const greenMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } )

// Elements
const redBall = new THREE.Mesh( sphereGeometry, redMaterial)
redBall.position.y = 1
redBall.position.x = -2
redBall.position.z = -2
const yellowBall = new THREE.Mesh( sphereGeometry, yellowMaterial)
yellowBall.position.y = 1
yellowBall.position.x = 0
yellowBall.position.z = 1
const greenBall = new THREE.Mesh( sphereGeometry, greenMaterial)
greenBall.position.y = 1
greenBall.position.x = 15
greenBall.position.z = -5

// Helpers
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

scene.add(redBall)
scene.add(yellowBall)
scene.add(greenBall)

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 2, 4);
scene.add(light);

let posCamZ = 5

const animate = function () {
    requestAnimationFrame( animate );
    camera.position.y = 1
    camera.position.z = posCamZ
    camera.position.x = 0
    camera.lookAt(0, 1, 0)
    renderer.render( scene, camera );
};

animate();

const input = document.querySelector('#pos_cam_z')
input.addEventListener('input', () => {
    posCamZ = input.value
})

let isPersp = false
const button = document.querySelector('#change_camera')
button.addEventListener('click', () => {
    isPersp = !isPersp
    camera = isPersp ? perspCamera : orthoCamera
    button.textContent = isPersp ? 'ORTHO' : 'PERSP'
})