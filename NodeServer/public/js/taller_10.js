import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OBJLoader } from './OBJLoader.js'
import { OrbitControls} from './OrbitControls.js'
import { MTLLoader } from './MTLLoader.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})

const controls = new OrbitControls( camera, renderer.domElement );

// Materials
const redMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } )
const greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
const blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } )
const yellowMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )

const mtlLoader = new MTLLoader();

mtlLoader.load(
    'models/Trashcan_OBJ/trashcan.mtl',
    function (material) {
        const loader = new OBJLoader();
        loader.setMaterials(material)
        loader.load(
            'models/Trashcan_OBJ/trashcan.obj',
            function ( object ) {
                // object.scale.x = 0.1
                // object.scale.y = 0.1
                // object.scale.z = 0.1
                scene.add( object );
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

// Helpers
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 2, 4);
scene.add(light);

const camDistance = 5
let theta = 0

camera.position.z = 5
controls.update()

const animate = function () {
    requestAnimationFrame( animate );
    theta += 0.5
    controls.update()
    renderer.render( scene, camera );
};

animate();