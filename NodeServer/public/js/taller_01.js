// Variable para guardar el canvas
var canvas;
// Variable para guardar el contexto WebGL
var gl;
// Cuando la página HTML termine de cargar, lanzar el método init
window.onload = init;
var program
var aPos
var vertices
var colors
var aColor
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
    aPos = gl.getAttribLocation(program, "aPos");

    aColor = gl.getAttribLocation(program, 'aColor')
    // PASO 3: Crear los vertices de la geometría
    vertices = {
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
    // Enlazar el buffer con la GPPU
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId);
    // Agregar los datos de los vertices al buffer
    gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.STATIC_DRAW);

    colors = {
        data: '',
        bufferId: ''
    }
    colors.data = new Float32Array(
        [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
        ]
    )
    colors.bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, colors.data, gl.STATIC_DRAW)

    render()
}

let c = 0
function render() {
    c +=0.01
    if (c > 1){
        c = 0
    }
// ****************************************
    // ETAPA DE RENDERING
    // ****************************************  
    // PASO 1: Preparar la ventana de visualizacion
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Aplicar un color de fondo
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Borrar el buffer de color
    gl.clear(gl.COLOR_BUFFER_BIT)

    // PASO 2: Decirle a WebGL que use nuestros programa
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId)
    // PASO 3: Activar los vertices
    gl.enableVertexAttribArray(aPos);
    // PASO 4: Decirle a WebGL cómo debe leer los vertices
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    colors.data = new Float32Array(
        [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, c, 1.0,

            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
        ]
    )
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, colors.data, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(aColor)
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)

    // gl.uniform1f(uOffset, 0.5)
    // PASO 5: dibujar
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    window.requestAnimFrame(render, canvas);
}
