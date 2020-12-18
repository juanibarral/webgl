import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls } from './OrbitControls.js'
import { MarchingCubes } from './MarchingCubes.js'

const createPointCloud = function(rawPoints) {
    const geometry = new THREE.Geometry();
    geometry.vertices = rawPoints
    geometry.computeBoundingSphere()    
    
    const material = new THREE.PointsMaterial({
        sizeAttenuation: false,
        size: 1
    })
    
    const points = new THREE.Points(geometry, material)
    
    scene.add (points)
}

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})
const controls = new OrbitControls(camera, renderer.domElement)

const marching = new MarchingCubes()
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )

const flag = false
const rawPoints = []
const resolution = 5
const step = 0.5
for(let cx = -resolution; cx < resolution; cx+=step) {
    for(let cy = -resolution; cy < resolution; cy+=step) {
        for(let cz = -resolution; cz < resolution; cz+=step) {
            // x, y, c is the center of cube
            // Calculate 8 points for cube
            const innerStep = step / 2
            const cubePoints = [
                [cx - innerStep, cy - innerStep, cz + innerStep],
                [cx + innerStep, cy - innerStep, cz + innerStep],
                [cx + innerStep, cy - innerStep, cz - innerStep],
                [cx - innerStep, cy - innerStep, cz - innerStep],
                [cx - innerStep, cy + innerStep, cz + innerStep],
                [cx + innerStep, cy + innerStep, cz + innerStep],
                [cx + innerStep, cy + innerStep, cz - innerStep],
                [cx - innerStep, cy + innerStep, cz - innerStep],
            ]
            let checks = ''
            for (let i = 0; i < cubePoints.length; i++) {
                const x = cubePoints[i][0]
                const y = cubePoints[i][1]
                const z = cubePoints[i][2]
                const val = (x*x*z*z) - y
                checks += val < 0 ? '1' : '0'
            }    
            // if (!flag) {
            //     const m = marching.addCube(redMaterial, step, [cx, cy, cz], checks)
            //     if (m !== undefined) {
            //         scene.add(m)
            //     }
            // }
        }
    }    
}



if(flag){
    const mesh = marching.getMesh(redMaterial)
    scene.add(mesh)    
}
// const mesh = marching.addCube(redMaterial)
// scene.add(mesh)

const boxGeometry = new THREE.BoxBufferGeometry()
const edges = new THREE.EdgesGeometry(boxGeometry)
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(0, 0, 0)
controls.update()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const animate = function () {
    requestAnimationFrame( animate );
    controls.update()

    renderer.render( scene, camera );
};

animate();