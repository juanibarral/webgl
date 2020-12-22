import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.getElementById('gl-canvas')
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setClearColor(new THREE.Color(0xAAAAAA), 1.0)

const controls = new OrbitControls( camera, renderer.domElement );

const imgLoader = new THREE.ImageLoader();
imgLoader.load('./img/terrain_heightmap.jpg', createHeightmap);

const maxHeight = 50
function createHeightmap(image) {
  // Extraer los colores dibujando la imagen en un canvas  
  const ctx = document.createElement('canvas').getContext('2d');
  const {width, height} = image;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.drawImage(image, 0, 0);
  // en data se encuentran los valores de color de los pixeles RGBA
  const {data} = ctx.getImageData(0, 0, width, height);

  // Crear una geometría
  const geometry = new THREE.Geometry();

  for (let z = 0; z < height - 1; ++z) {
    for (let x = 0; x < width - 1; ++x) {
      // calculo los indices de color dentro del arreglo
      // Como los colores son RGBA, los indices se multiplican por 4
      const indexj = ((z * width) + x) * 4
      const indexj_1 = indexj + (width * 4)
      // Como es una imagen gris, RGB son iguales
      // Calculo alturas por cada pixel
      //      2----3
      //      |\  /|
      //      | \/4|
      //      | /\ |
      //      |/  \|
      //      0----1

      const h0 = (data[indexj_1] / 255) * maxHeight;
      const h1 = (data[indexj_1 + 4] / 255) * maxHeight;
      const h2 = (data[indexj] / 255) * maxHeight;
      const h3 = (data[indexj + 4] / 255) * maxHeight;
      const h4 = ((h0 + h1 + h2 + h3) / 4);

      // Posiciones de las esquinas
      const x0 = x;
      const x1 = x + 1;
      const z0 = z;
      const z1 = z + 1;
      // Crear el índice del triangulo
      const ndx = geometry.vertices.length; 
      // Crear los vertices de los triángulos
      geometry.vertices.push(
        new THREE.Vector3(x0, h0, z1), //v0
        new THREE.Vector3(x1, h1, z1), //v1
        new THREE.Vector3(x0, h2, z0), //v2
        new THREE.Vector3(x1, h3, z0), //v3
        new THREE.Vector3((x0 + x1) / 2, h4, (z0 + z1) / 2) //v4
      );

      // Crear los 4 triángulos usando los indices de los vértices
      geometry.faces.push(
        new THREE.Face3(ndx + 0, ndx + 1, ndx + 4), //f0
        new THREE.Face3(ndx + 1, ndx + 3, ndx + 4), //f1
        new THREE.Face3(ndx + 3, ndx + 2, ndx + 4), //f2
        new THREE.Face3(ndx + 2, ndx + 0, ndx + 4), //f3
      );

      // Crear las coordenadas de textura por cada cara
      const widthInPixels = width - 1
      const heightInPixels = height - 1
      const u0 = x / widthInPixels
      const u1 = (x + 1) / widthInPixels
      const v0 = 1 -(z / heightInPixels)
      const v1 = 1 -((z + 1) / heightInPixels)
      const um = (u0 + u1) / 2
      const vm = (v0 + v1) / 2

      geometry.faceVertexUvs[0].push(
        [ new THREE.Vector2(u0, v1), new THREE.Vector2(u1, v1), new THREE.Vector2(um, vm) ], //f0
        [ new THREE.Vector2(u1, v1), new THREE.Vector2(u1, v0), new THREE.Vector2(um, vm) ], //f1
        [ new THREE.Vector2(u1, v0), new THREE.Vector2(u0, v0), new THREE.Vector2(um, vm) ], //f2
        [ new THREE.Vector2(u0, v0), new THREE.Vector2(u0, v1), new THREE.Vector2(um, vm) ], //f3
      );
    }
  }
  // Calcular normales para poder rsponder a la luz
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  // Centrarla
  geometry.translate(width / -2, 0, height / -2);
  // Cargar la imagen para usar como textura
  const loader = new THREE.TextureLoader();
  const texture = loader.load('./img/terrain_texture.jpg');
  // Mapear la textura
  const material = new THREE.MeshPhongMaterial({ map: texture, flatShading: false});
  // const material = new THREE.MeshPhongMaterial({ color: 0xffff00});
  // Crear la malla
  const terrain = new THREE.Mesh(geometry, material);
  scene.add(terrain);
}

// Helpers
const axesHelper = new THREE.AxesHelper(5)
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
camera.position.x = 100
camera.position.y = 100
camera.position.z = 100
controls.update()

const animate = function () {
    requestAnimationFrame( animate );
    controls.update()
    renderer.render( scene, camera );
};

animate();