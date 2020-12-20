import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

// Materials
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
const greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
const blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } )
const yellowMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )


// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)


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