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
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn’t available"); }

    const program = InitShaders(gl, "vertex-shader", "fragment-shader");

    const aPos = gl.getAttribLocation(program, 'aPos')
    const uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')
    const uViewMatrix = gl.getUniformLocation(program, 'uViewMatrix')
    const uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
    // Nuevo atributo para aplicar un color por vértice
    const aColor = gl.getAttribLocation(program, 'aColor') // Color por vertice

    // MODEL MATRIX
    const modelMatrix = mat4.create()
    // VIEW MATRIX
    const viewMatrix = mat4.create()
    const eye = [0, 0, 6]
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

    // Triangulos
    const vertices = {
        data: '', // Datos de los vertices
        bufferId: '' // Buffer para los datos
    };
    vertices.data = new Float32Array(
        [
            -0.90, -0.90, 0.0, // Triángulo 1
            0.85, -0.90, 0.0,
            -0.90, 0.85, 0.0,
            0.90, -0.85, 0.0, // Triangulo 2
            0.90, 0.90, 0.0,
            -0.85, 0.90, 0.0
        ]);
    vertices.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.STATIC_DRAW);

    // Colores
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
    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors.data), gl.STATIC_DRAW);

    // ****************************************
    // ETAPA DE RENDERING
    // ****************************************  
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program);
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
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId);
    gl.enableVertexAttribArray(aColor);
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
    
    // PASO 5: dibujar
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}
