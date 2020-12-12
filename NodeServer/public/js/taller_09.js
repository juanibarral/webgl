import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5
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
// Dynamic variables
let bodyRot = 0
let headRot = 0
let leftArmRot = 0
let leftForearmRot = 0
let rightArmRot = 0
let rightForearmRot = 0

const bodyNode = new THREE.Object3D()
const chest = new THREE.Mesh( boxGeometry, greenMaterial )
chest.scale.x = 3
chest.scale.y = 3
bodyNode.add(chest)

// Head
const head = new THREE.Mesh( sphereGeometry, redMaterial)
head.position.y = 2.5
const nose = new THREE.Mesh( coneGeometry, yellowMaterial)
nose.rotateX(90 * Math.PI / 180)
nose.scale.x = 0.5
nose.scale.y = 0.5
nose.scale.z = 0.5
nose.position.z = 1
head.add(nose)
bodyNode.add(head)

// Left arm
const leftArmNode = new THREE.Object3D()
bodyNode.add(leftArmNode)
leftArmNode.position.set(2, 1.5, 0)
const leftArm = new THREE.Mesh(boxGeometry, blueMaterial)
leftArm.scale.y = 3
leftArm.position.y = -1.5
leftArmNode.add(leftArm)

const leftForearmNode = new THREE.Object3D()
leftForearmNode.position.y = -3
leftArmNode.add(leftForearmNode)
const leftForeArm = new THREE.Mesh(boxGeometry, greenMaterial)
leftForeArm.scale.y = 3
leftForeArm.scale.x = 0.75
leftForeArm.scale.z = 0.75
leftForeArm.position.y = -1.5
leftForearmNode.add(leftForeArm)

// Right arm
const rightArmNode = new THREE.Object3D()
bodyNode.add(rightArmNode)
rightArmNode.position.set(-2, 1.5, 0)
const rightArm = new THREE.Mesh(boxGeometry, blueMaterial)
rightArm.scale.y = 3
rightArm.position.y = -1.5
rightArmNode.add(rightArm)

const rightForearmNode = new THREE.Object3D()
rightForearmNode.position.y = -3
rightArmNode.add(rightForearmNode)
const rightForeArm = new THREE.Mesh(boxGeometry, greenMaterial)
rightForeArm.scale.y = 3
rightForeArm.scale.x = 0.75
rightForeArm.scale.z = 0.75
rightForeArm.position.y = -1.5
rightForearmNode.add(rightForeArm)

// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

scene.add(bodyNode)


let theta = 0

camera.position.y = 5

const animate = function () {
    requestAnimationFrame( animate );
    theta += 0.5
    // camera.position.z = camDistance * Math.cos(theta * Math.PI / 180)
    // camera.position.x = camDistance * Math.sin(theta * Math.PI / 180)
    camera.lookAt(0, 0, 0)
    renderer.render( scene, camera );
};

animate();

// Controles
const ctrlBody = document.getElementById('body_rot')
ctrlBody.addEventListener('input', () => {
    bodyRot = ctrlBody.value
    bodyNode.rotation.y = (bodyRot * Math.PI / 180)
})
const ctrlHead = document.getElementById('head_rot')
ctrlHead.addEventListener('input', () => {
    headRot = ctrlHead.value
    head.rotation.y = (headRot * Math.PI / 180)
})
const ctrlLeftArm = document.getElementById('left_arm_rot')
ctrlLeftArm.addEventListener('input', () => {
    leftArmRot = ctrlLeftArm.value
    leftArmNode.rotation.x = -leftArmRot * Math.PI / 180
})
const ctrlLeftForearm = document.getElementById('left_forearm_rot')
ctrlLeftForearm.addEventListener('input', () => {
    leftForearmRot = ctrlLeftForearm.value
    leftForearmNode.rotation.x = -leftForearmRot * Math.PI / 180
})
const ctrlRightArm = document.getElementById('right_arm_rot')
ctrlRightArm.addEventListener('input', () => {
    rightArmRot = ctrlRightArm.value
    rightArmNode.rotation.x = -rightArmRot * Math.PI / 180
})
const ctrlRightForearm = document.getElementById('right_forearm_rot')
ctrlRightForearm.addEventListener('input', () => {
    rightForearmRot = ctrlRightForearm.value
    rightForearmNode.rotation.x = -rightForearmRot * Math.PI / 180
})


