import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 100)
const renderer = new THREE.WebGLRenderer({canvas})

// Geometrias
const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry();
const coneGeometry = new THREE.ConeGeometry();
// Materiales
const redMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
const greenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})
const blueMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff})
const yellowMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})

// Tronco
const tronco = new THREE.Mesh(boxGeometry, greenMaterial)
tronco.scale.x = 3
tronco.scale.y = 3
// scene.add(tronco)

// Brazo izquierdo
const nodoBrazoIzq = new THREE.Object3D()
scene.add(nodoBrazoIzq)

const brazoIzq = new THREE.Mesh(boxGeometry, blueMaterial)
brazoIzq.scale.y = 3
brazoIzq.position.y = -1.5
nodoBrazoIzq.add(brazoIzq)
// brazoIzq.position.x = 2
// brazoIzq.rotateX(-45 * Math.PI / 180)
// brazoIzq.position.y = 0.5
// brazoIzq.position.z = 1
// scene.add(brazoIzq)


// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)

camera.position.y = 5

const camDistance = 5
let theta = 0
const animate = function() {
    requestAnimationFrame(animate)

    theta += 0.05
    nodoBrazoIzq.rotation.x = theta
    camera.position.x = camDistance * Math.cos(theta * Math.PI / 180)
    camera.position.z = camDistance * Math.sin(theta * Math.PI / 180)
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
}

animate()