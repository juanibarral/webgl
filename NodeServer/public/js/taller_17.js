import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OBJLoader } from './OBJLoader.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

const controls = new OrbitControls( camera, renderer.domElement )

// Materials
const floorMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
const whiteMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF})
const textureLoader = new THREE.TextureLoader()
const shadowTexture = textureLoader.load('./img/roundshadow.png')
const shadowMaterial = new THREE.MeshBasicMaterial({
  map: shadowTexture,
  transparent: true
})

// Piso
const floorGeometry = new THREE.PlaneGeometry(10, 10)
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
scene.add(floor)

// Esfera
const sphereNode = new THREE.Object3D()
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
const sphere = new THREE.Mesh(sphereGeometry, whiteMaterial)
sphere.position.y = 0.5
sphereNode.add(sphere)
// Fake Shadow
const shadowGeo = new THREE.PlaneGeometry(1, 1);
const shadow = new THREE.Mesh(shadowGeo, shadowMaterial)
shadow.position.y = 0.001
shadow.rotation.x = -Math.PI / 2
shadow.scale.set(4, 4, 4)
sphereNode.add(shadow)
scene.add(sphereNode)


// Iluminación
// Parámetros
const color = 0xFFFFFF
const intensity = 1

// Luz direccional
const directionalLight = new THREE.DirectionalLight(color, intensity)
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

const animate = function () {
    requestAnimationFrame( animate );
    controls.update()
    renderer.render( scene, camera );
};

animate();

const input = document.querySelector('#height')
input.addEventListener('input', () => {
  const height = input.value  
  sphere.position.y = height
  const interpolated = 4 - (((height - 0.5)/4.5) * 4)
  shadow.scale.set(interpolated, interpolated, interpolated)
})