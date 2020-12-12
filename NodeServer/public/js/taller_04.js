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
var camera
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

    program = InitShaders(gl, "vertex-shader", "fragment-shader")

    const aPos = gl.getAttribLocation(program, 'aPos')
    const uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')
    const modelMatrix = mat4.create()
    const uPointSize = gl.getUniformLocation(program, 'uPointSize')
    const pointSize = 5

    camera = new Camera()
    camera.eye = [0, 0, 3]
    const vertices = {
        data: '', // Datos de los vertices
        bufferId: '' // Buffer para los datos
    };
    vertices.data = new Float32Array(
        [
            -0.30, -0.60,
            0.30, -0.60,
            0.60, 0.0,
            0.30, 0.60, 
            -0.30, 0.60,
            -0.60, 0.0
        ]);
    vertices.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.STATIC_DRAW);

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
        modelMatrix);
    gl.uniform1f(uPointSize, pointSize)

    camera.use()
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aPos);
    
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
            boton.textContent = 'Dibujar como LINEAS'
            break
        case LINEAS:
            boton.textContent = 'Dibujar como LINEA CONTINUA'
            break
        case LINEA_CONTINUA:
            boton.textContent = 'Dibujar como LINEA CERRADA'
            break
        case LINEA_CERRADA:
            boton.textContent = 'Dibujar como TRIANGULOS'
            break
        case TRIANGULOS:
            boton.textContent = 'Dibujar como PUNTOS'
            break
    }
}