import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OBJLoader } from './OBJLoader.js'
import { OrbitControls} from './OrbitControls.js'
import { MTLLoader } from './MTLLoader.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

const controls = new OrbitControls( camera, renderer.domElement );

// Creación de nodo para manipular el avión
const planeNode = new THREE.Object3D()
scene.add(planeNode)

// Carga del objeto avion
const mtlLoader = new MTLLoader();
const objPath = 'models/Plane/Plane'
mtlLoader.load(
    objPath + '.mtl',
    function (material) {
        const loader = new OBJLoader();
        loader.setMaterials(material)
        loader.load(
            objPath + '.obj',
            function ( object ) {
                object.scale.x = 0.005
                object.scale.y = 0.005
                object.scale.z = 0.005
                object.rotation.y = Math.PI
                object.position.z = -0.5
                planeNode.add( object )
            },
            // called when loading is in progresses
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
    },
	// called when loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
)

// Ruta
const curvePath = new THREE.CurvePath()
const path_01 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(10, 5, 5),
    new THREE.Vector3(10, 5, 0),
)
curvePath.add(path_01)

const path_02 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(10, 5, 0),
    new THREE.Vector3(10, 5, -10),
    new THREE.Vector3(4, 5, 0),
    new THREE.Vector3(4, 5, -5),
)
curvePath.add(path_02)

const path_03 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(4, 5, -5),
    new THREE.Vector3(4, 5, -10),
    new THREE.Vector3(0, 0, -5),
    new THREE.Vector3(0, 0, 0),
)
curvePath.add(path_03)

const resolution = 50
const points = curvePath.getPoints(resolution)
drawPathSegment(curvePath)

function drawPathSegment(path) {
    const points = path.getPoints(resolution)

    // DibujarRuta
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xffffff } );
    const curveObject = new THREE.Line( geometry, material );
    scene.add( curveObject)
    
    const pGeometry = new THREE.Geometry();
    pGeometry.vertices = points 
    const pMaterial = new THREE.PointsMaterial({
        sizeAttenuation: false,
        size: 5
    })
    const pPoints = new THREE.Points(pGeometry, pMaterial)
    scene.add (pPoints)    
}


// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const skyColor = 0xFFFFFF
const groundColor = 0xAAAAAA
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

camera.position.z = 5
controls.update()

// Animación frame a frame
// /**
let frameRate = 0.1
let before = 0
let i = 0

const animate = function (now) {
    const nowInSecs = now / 1000
    requestAnimationFrame( animate );

    const delta = nowInSecs - before
    if (delta >= frameRate) {
        if (i >= points.length - 1) {
            i = 0
        }
        
        planeNode.position.x = points[i].x
        planeNode.position.y = points[i].y
        planeNode.position.z = points[i].z

        planeNode.lookAt(points[i + 1])
        i++
        before = nowInSecs
    }
    
    
    controls.update()
    renderer.render( scene, camera );
};
//*/
// Animación por interpolación
/**
let duration = 15
let beforePosition
let before = 0
const animate = function (now) {
    const nowInSecs = now / 1000
    requestAnimationFrame( animate );

    const delta = nowInSecs - before
    if (delta >= duration) {
        before = nowInSecs // Reset animation
    }

    const durationPassed = delta / duration // Normalizado
    const point = curvePath.getPoint(durationPassed)
    if (point) {
        if (beforePosition) {
            planeNode.position.x = beforePosition.x
            planeNode.position.y = beforePosition.y
            planeNode.position.z = beforePosition.z
            planeNode.lookAt(point)
        }
        beforePosition = point
    }  
    controls.update()
    renderer.render( scene, camera );
};
// */
animate();