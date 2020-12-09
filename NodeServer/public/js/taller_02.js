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

    // PASO 3: Obtener los ids de los attribute y uniform que se van a usar en el shader
    var aPos = gl.getAttribLocation(program, "aPos"); // Posición de los vértices
    var uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')
    var uViewMatrix = gl.getUniformLocation(program, 'uViewMatrix')
    var uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
    
    // Paso 4: Inicializamos los datos de las matrices
    // MODEL MATRIX
    const modelMatrix = mat4.create()
    // VIEW MATRIX
    const viewMatrix = mat4.create()
    const eye = [3, 3, 3]
    const center = [0, 0, 0]
    const up = [0, 1, 0]
    mat4.lookAt(viewMatrix,
        eye,
        center,
        up)

    // PROJECTION MATRIX
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

    // PASO 5: Crear los vertices de la geometría en 3D
    var vertices = {
        data: '', // Datos de los vertices
        bufferId: '' // Buffer para los datos
    };
    // Crear los vertices
    vertices.data = new Float32Array(
        [
            -0.90, -0.90, 0.0, // Triángulo 1
            0.85, -0.90, 0.0,
            -0.90, 0.85, 0.0,
            0.90, -0.85, 0.0, // Triangulo 2
            0.90, 0.90, 0.0,
            -0.85, 0.90, 0.0
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
    // PASO 1: Decirle a WebGL como transformar de espacio de CLIP a pixeles
    gl.viewport(0, 0, canvas.width, canvas.height);

    // PASO 2: Borrar el canvas
    // Aplicar un color de fondo
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Borrar el buffer de color
    gl.clear(gl.COLOR_BUFFER_BIT)

    // PASO 3: Decirle a WebGL que use nuestros programa
    gl.useProgram(program);

    // PASO 4: Activar los attribute y uniform
    gl.uniformMatrix4fv(
        uModelMatrix,
        false,
        modelMatrix
    )
    gl.uniformMatrix4fv(
        uViewMatrix,
        false,
        viewMatrix);
    gl.uniformMatrix4fv(
        uProjectionMatrix,
        false,
        projectionMatrix);

    // Activar los vertices
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    // PASO 5: dibujar
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}
