// Variable para guardar el canvas
var canvas;
// Variable para guardar el contexto WebGL
var gl;
// Cuando la página HTML termine de cargar, lanzar el método init
window.onload = init;

var camara
var ejes
var cono
/**
 * Funcion para inicial el programa
 */
function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn’t available"); }

    program = InitShaders(gl, "vertex-shader", "fragment-shader");

    camara = new Camera(gl.canvas)
    camara.translate(0, 0, -10)
    ejes = new Ejes()
    cono = new Cone(2, 1, 3)

    render()
}

function render() {
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program);

    camara.use()
    ejes.draw()
    cono.draw()
    window.requestAnimFrame(render, canvas);
}

function updateRotCamY(value) {
    camara.rotY(value)
    document.getElementById('rot_cam_y').value = value + " grados"
}

function updateRotCamX(value) {
    camara.rotX(value)
    document.getElementById('rot_cam_x').value = value + " grados"
}