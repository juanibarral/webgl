import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

// Geometries
const geometry = new THREE.BoxGeometry(5, 5, 5)
// Materials
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )

const loader = new THREE.TextureLoader()
const texture = loader.load('./img/base_texture_2.jpg')
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(2, 2)
const texMaterial = new THREE.MeshBasicMaterial({
    map: texture
})

// Meshes
const cube = new THREE.Mesh(geometry, texMaterial)

scene.add(cube)

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