// Variable para guardar el canvas
var canvas;
// Variable para guardar el contexto WebGL
var gl;
// Cuando la página HTML termine de cargar, lanzar el método init
window.onload = init;

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
    var program = InitShaders(gl, "vertex-shader", "fragment-shader");
    var aPos = gl.getAttribLocation(program, "aPos");

    // PASO 3: Crear los vertices de la geometría
    var vertices = {
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
    // PASO 3: Activar los vertices
    gl.enableVertexAttribArray(aPos);
    // PASO 4: Decirle a WebGL cómo debe leer los vertices
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    // PASO 5: dibujar
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}
