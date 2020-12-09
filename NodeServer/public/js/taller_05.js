// Variable para guardar el canvas
var canvas;
// Variable para guardar el contexto WebGL
var gl;
// Cuando la página HTML termine de cargar, lanzar el método init
window.onload = init;

var camara
var ejes
var cono

var uModelMatrix
var modelMatrix
/**
 * Funcion para inicial el programa
 */
function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn’t available"); }

    program = InitShaders(gl, "vertex-shader", "fragment-shader");

    uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')
    modelMatrix = mat4.create()
    camara = new Camera()

    console.log(camara.eye)
    const val = 15
    const x = camara.eye[2] * Math.cos(val * Math.PI / 180)
    const z = camara.eye[2] * Math.sin(val * Math.PI / 180)

    camara.eye = [x, camara.eye[1], z]

    console.log(camara.eye)
    ejes = new Ejes()
    // cono = new Cone(2, 1, 3)

    render()
}

function render() {
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program);
    
    gl.uniformMatrix4fv(
        uModelMatrix,
        false,
        modelMatrix);
    camara.use()
    ejes.draw()
    // cono.draw()
    window.requestAnimFrame(render, canvas);
}

function updateRotCamY(value) {
    // const x = camara.eye[2] * Math.cos(value * Math.PI / 180)
    // const z = camara.eye[2] * Math.sin(value * Math.PI / 180)
    // camara.eye = [x, camara.eye[1], z]
    document.getElementById('rot_cam_y').value = value + " grados"
}

function updateRotCamX(value) {
    // camara.rotX(value)
    document.getElementById('rot_cam_x').value = value + " grados"
}