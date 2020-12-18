import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

// Geometries
const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry()
const coneGeometry = new THREE.ConeGeometry()
// Materials
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
const greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
const blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } )
const yellowMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )





// Parts
const chest = new THREE.Mesh( boxGeometry, greenMaterial )
chest.scale.x = 3
chest.scale.y = 3

const leftArm = new THREE.Mesh(boxGeometry, blueMaterial)
leftArm.scale.y = 3
leftArm.rotateX(-45 * Math.PI / 180)
leftArm.position.x = 2
leftArm.position.y = 0.5
leftArm.position.z = 1

const leftLowerArm = new THREE.Mesh(boxGeometry, greenMaterial)
leftLowerArm.scale.y = 3
leftLowerArm.scale.x = 0.75
leftLowerArm.scale.z = 0.75
leftLowerArm.rotateX(45 * Math.PI / 180)
leftLowerArm.position.x = 2
leftLowerArm.position.y = 0.5
leftLowerArm.position.z = 3

const rightArm = new THREE.Mesh(boxGeometry, blueMaterial)
rightArm.scale.y = 3
rightArm.rotateX(45 * Math.PI / 180)
rightArm.position.x = -2
rightArm.position.y = 0.5
rightArm.position.z = -1

const rightLowerArm = new THREE.Mesh(boxGeometry, greenMaterial)
rightLowerArm.scale.y = 3
rightLowerArm.scale.x = 0.75
rightLowerArm.scale.z = 0.75
rightLowerArm.position.x = -2
rightLowerArm.position.y = -2
rightLowerArm.position.z = -2

const head = new THREE.Mesh( sphereGeometry, redMaterial)
head.position.y = 2.5

const nose = new THREE.Mesh( coneGeometry, yellowMaterial)
nose.position.y = 2.5
nose.position.z = 1
nose.rotateX(90 * Math.PI / 180)
nose.scale.x = 0.5
nose.scale.y = 0.5
nose.scale.z = 0.5

// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

scene.add(chest)
scene.add(head)
scene.add(nose)
scene.add(leftArm)
scene.add(leftLowerArm)
scene.add(rightArm)
scene.add(rightLowerArm)

const camDistance = 5
let theta = 0

camera.position.y = 5

const animate = function () {
    requestAnimationFrame( animate );
    theta += 0.5
    camera.position.z = camDistance * Math.cos(theta * Math.PI / 180)
    camera.position.x = camDistance * Math.sin(theta * Math.PI / 180)
    camera.lookAt(0, 0, 0)
    renderer.render( scene, camera );
};

animate();