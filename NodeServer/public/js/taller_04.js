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
    const program = InitShaders(gl, "vertex-shader", "fragment-shader");

    // PASO 3: Comunicar los datos con el shader (ubicarlos)
    const aPos = gl.getAttribLocation(program, 'aPos') // Vertices
    const uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix') // Matriz de Proyección
    const uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix') // Matriz de Modelo
    const aColor = gl.getAttribLocation(program, 'aColor') // Color por vertice
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
    // Inicializamos los datos de la matríz de modelo
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix,
        modelViewMatrix,
        [0.0, 0.0, -6.0]);

    // PASO 4: Crear los vertices de la geometría
    const vertices = {
        data: '', // Datos de los vertices
        bufferId: '' // Buffer para los datos
    };
    // Crear los vertices
    vertices.data = new Float32Array(
        [
            -0.90, -0.90, // Triángulo 1
            0.85, -0.90,
            -0.90, 0.85,
            0.90, -0.85, // Triangulo 2
            0.90, 0.90,
            -0.85, 0.90
        ]);
    // Crear el buffer
    vertices.bufferId = gl.createBuffer();
    // Enlazar los datos con el buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.STATIC_DRAW);

    // PASO 5: Crear un buffer para los colores de los vértices
    const colors = {
        data: '',
        bufferId: ''
    }
    colors.data = [
        1.0, 0.0, 0.0, 1.0,    // Rojo
        0.0, 1.0, 0.0, 1.0,    // Verde
        0.0, 0.0, 1.0, 1.0,    // Azul
        1.0, 1.0, 0.0, 1.0,    // Amarillo
        0.0, 1.0, 1.0, 1.0,    // Cyan
        1.0, 0.0, 1.0, 1.0,    // Magenta
    ];

    colors.bufferId = colorBuffer = gl.createBuffer();
    // Enlazar datos con el buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors.data), gl.STATIC_DRAW);

    // ****************************************
    // ETAPA DE RENDERING
    // ****************************************  
    // PASO 1: Decirle a WebGL como transformar de espacio de CLIP a pixeles
    gl.viewport(0, 0, canvas.width, canvas.height);

    // PASO 2: Borrar el canvas
    // Aplicar un color de fondo
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Borrar el buffer de color
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
    // Enviar los vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPos);
    // Enviar los colores
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aColor);

    // PASO 5: dibujar
    switch (primitiva) {
        case PUNTOS:
            gl.drawArrays(gl.POINTS, 0, 6)
            break
        case LINEAS:
            gl.drawArrays(gl.LINES, 0, 6)
            break
        case LINEA_CONTINUA:
            gl.drawArrays(gl.LINE_STRIP, 0, 6)
            break
        case LINEA_CERRADA:
            gl.drawArrays(gl.LINE_LOOP, 0, 6)
            break
        case TRIANGULOS:
            gl.drawArrays(gl.TRIANGLES, 0, 6)
            break
    }
}

function cambiarPrimitiva() {
    primitiva++
    if (primitiva > TRIANGULOS) {
        primitiva = PUNTOS
    }
    init()

    var boton = document.getElementById('change_button')
    switch (primitiva) {
        case PUNTOS:
            boton.textContent = 'LINEAS'
            break
        case LINEAS:
            boton.textContent = 'LINEA CONTINUA'
            break
        case LINEA_CONTINUA:
            boton.textContent = 'LINEA CERRADA'
            break
        case LINEA_CERRADA:
            boton.textContent = 'TRIANGULOS'
            break
        case TRIANGULOS:
            boton.textContent = 'PUNTOS'
            break
    }
}