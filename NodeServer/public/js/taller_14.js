import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

const controls = new OrbitControls( camera, renderer.domElement );

// Path a seguir
const curve = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 10, 15, -10 ),
	new THREE.Vector3( -10, 0, 0 )
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color : 0xffffff } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
scene.add( curveObject)

const vPoints = []
points.forEach((p) => {
  vPoints.push(new THREE.Vector3(p.x, p.y, p.z))
})
const pGeometry = new THREE.Geometry();
pGeometry.vertices = vPoints
pGeometry.computeBoundingSphere()    
const pMaterial = new THREE.PointsMaterial({
    sizeAttenuation: false,
    size: 5
})
const pPoints = new THREE.Points(pGeometry, pMaterial)
scene.add (pPoints)




const boxGeometry = new THREE.BoxGeometry()
const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000});
const cube = new THREE.Mesh(boxGeometry, redMaterial)

const cubeNode = new THREE.Object3D()
cubeNode.add(cube)
scene.add( cubeNode)

// Helpers
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

// Iluminación
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 2, 4);
scene.add(light);

// Posición inicial de la camara
camera.position.x = 15
camera.position.y = 15
camera.position.z = 15
controls.update()

let i = 0


let before = 0
const frameRate = 1
const animate = function (now) {
    const nowInSec = now * 0.001
    requestAnimationFrame( animate );
    
    const delta = nowInSec - before
    if (delta >= frameRate){
      if ( i >= points.length) {
        i = 0
      }
      const p = points[i]

      let newPos = new THREE.Vector3(p.x, p.y, p.z)
      cubeNode.position.x = newPos.x
      cubeNode.position.y = newPos.y
      cubeNode.position.z = newPos.z
      before = nowInSec
      i++
    }
    
    controls.update()
    renderer.render( scene, camera );
    
};

animate();