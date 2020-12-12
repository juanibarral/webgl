import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas})

const geometry = new THREE.BoxGeometry();
for(let i = 0; i < geometry.faces.length; i+=2) {
    const color = Math.random() * 0xffffff
    geometry.faces[i].color.setHex(color)
    geometry.faces[i + 1].color.setHex(color)
}

const material = new THREE.MeshBasicMaterial( { vertexColors: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();