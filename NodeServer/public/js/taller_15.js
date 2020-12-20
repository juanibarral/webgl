import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OBJLoader } from './OBJLoader.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

const controls = new OrbitControls( camera, renderer.domElement )

// Materials
const whiteMaterial = new THREE.MeshPhongMaterial(
  {
    color: 0xffffff,
    // emissive: 0xff0000,
    specular: 0xFFFFFF,
    shininess: 0,
    flatShading: false // true: normales por cara, false normales por vertice 
  }
)

const loader = new OBJLoader();
loader.load(
    'models/teapot_with_normals.obj',
    function ( object ) {
      object.traverse( (child) => {
        if (child instanceof THREE.Mesh) {
          child.material = whiteMaterial
        }
      })
      object.rotation.x = -90 * Math.PI / 180
      object.scale.x = 0.2
      object.scale.y = 0.2
      object.scale.z = 0.2
      scene.add( object )
    },
    // called when loading is in progresses
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' )
    }
)

// Iluminación
// Parámetros
const color = 0xFFFFFF
const intensity = 0.8
// Luz ambiente
// const ambientLight = new THREE.AmbientLight(color, intensity)
// scene.add(ambientLight)

// Luz hemisférica
// const skyColor = 0xFF0000
// const groundColor = 0x00FF00
// const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
// scene.add(hemisphereLight);


// Luz direccional
const directionalLight = new THREE.DirectionalLight(color, intensity)
directionalLight.position.set(0, 2, 4)
directionalLight.target.position.set(0, 0, 0)
directionalLight.target.updateMatrixWorld()
scene.add(directionalLight)
scene.add(directionalLight.target)
// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// dirLightHelper.update()
// scene.add(dirLightHelper)

// Luz puntual
// const pointLight = new THREE.PointLight(color, intensity)
// pointLight.position.set(0, 2, 4)
// pointLight.distance = 0 // Por defecto es 0
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

// Spotlight
// const spotLight = new THREE.SpotLight(color, intensity);
// spotLight.position.set(0, 2, 4)
// spotLight.angle = 45 * Math.PI / 180
// spotLight.penumbra = 0.5
// spotLight.target.position.set(0, 0, 0)
// spotLight.target.updateMatrixWorld();
// scene.add(spotLight);
// scene.add(spotLight.target)
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

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