import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OBJLoader } from './OBJLoader.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

const controls = new OrbitControls( camera, renderer.domElement )

// Materials
const textureLoader = new THREE.TextureLoader()
const bumpTexture = textureLoader.load('./img/bumpmap.jpg')
const normalTexture = textureLoader.load('./img/normalmap.png')
const texture = textureLoader.load('./img/base_texture_2.jpg')
const whiteMaterial = new THREE.MeshPhongMaterial(
  {
    color: 0xffffff,
    // emissive: 0xff0000,
    // specular: 0x00FF00,
    // shininess: 30,
    map: texture, 
    normalMap: normalTexture,
    // bumpMap: bumpTexture,
    flatShading: false // true: normales por cara, false normales por vertice 
  }
)

const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
const cube = new THREE.Mesh(boxGeometry, whiteMaterial)
scene.add(cube)


// Iluminación
// Parámetros
const color = 0xFFFFFF
const intensity = 1

// Luz direccional
const pointLight = new THREE.PointLight(color, intensity)
pointLight.position.set(0, 0, 4)
pointLight.distance = 0 // Por defecto es 0
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

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