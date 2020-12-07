// Variable para guardar el canvas
var canvas;
// Variable para guardar el contexto WebGL
var gl;
// Cuando la página HTML termine de cargar, lanzar el método init
window.onload = init;

const PUNTOS = 0
const LINEAS = 1
const LINEA_CONTINUA = 2
const LINEA_CERRADA = 3
const TRIANGULOS = 4
var primitiva = PUNTOS
var program
/**
 * Funcion para inicial el programa
 */
function init() {
    // ****************************************
    // ETAPA DE INICIALIZACION
    // ****************************************
    // PASO 1: Obtener el contexto WebGL desde el canvas
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn’t available"); }

    // PASO 2: Inicializar los shaders GLSL y crear un programa de GLSL
    program = InitShaders(gl, "vertex-shader", "fragment-shader");

    // PASO 3: Comunicar los datos con el shader (ubicarlos)
    // const aPos = gl.getAttribLocation(program, 'aPos') // Vertices
    const uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix') // Matriz de Proyección
    const uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix') // Matriz de Modelo
    const uPointSize = gl.getUniformLocation(program, 'uPointSize')

    // Inicializamos los datos de la matríz de proyección
    const fieldOfView = 45 * Math.PI / 180;   // Radianes
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);
    mat4.translate(projectionMatrix,
        projectionMatrix,
        [0.0, 0.0, -10.0]);
    mat4.rotateY(projectionMatrix,
        projectionMatrix,
        -40 * Math.PI / 180
        )
    mat4.rotateX(projectionMatrix,
        projectionMatrix,
        5 * Math.PI / 180
        )


    // Inicializamos los datos de la matríz de modelo
    const modelViewMatrix = mat4.create();

    const ejes = new Ejes()
    const piramide = new Piramide() 
   
    // ****************************************
    // ETAPA DE RENDERING
    // ****************************************  
    // PASO 1: Decirle a WebGL como transformar de espacio de CLIP a pixeles
    gl.viewport(0, 0, canvas.width, canvas.height);

    // PASO 2: Borrar el canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    // PASO 3: Decirle a WebGL que use nuestros programa
    gl.useProgram(program);

    // PASO 4: Decirle a WebGL cómo debe leer los buffers
    // Enviar las matrices de proyección y modelo al shader
    gl.uniformMatrix4fv(
        uProjectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        uModelViewMatrix,
        false,
        modelViewMatrix);
    gl.uniform1f(uPointSize, 5.0)

    ejes.draw()
    piramide.draw()
}
