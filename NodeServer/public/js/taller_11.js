var canvas;
var gl;
window.onload = init;

var camara
var square

var uModelMatrix
var modelMatrix

var phi = 30
var theta = 25
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

    const z = 10 * Math.cos(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180)
    const x = 10 * Math.cos(theta * Math.PI / 180) * Math.sin(phi * Math.PI / 180)
    const y = 10 * Math.sin(theta * Math.PI / 180)
    camara.eye = [x, y, z]
    square = new Square()

    // gl.enable(gl.CULL_FACE)

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    render()
}

function render() {
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.6, 0.6, 0.6, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.useProgram(program);
    
    gl.uniformMatrix4fv(
        uModelMatrix,
        false,
        modelMatrix);
    camara.use()
    square.draw()
    window.requestAnimFrame(render, canvas);
}

function updateRotCamY(value) {
    phi = value
    const z = 10 * Math.cos(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180)
    const x = 10 * Math.cos(theta * Math.PI / 180) * Math.sin(phi * Math.PI / 180)
    const y = 10 * Math.sin(theta * Math.PI / 180)
    camara.eye = [x, y, z]

    document.getElementById('rot_cam_y').value = value + " grados"
}

function updateRotCamX(value) {
    theta = value
    const z = 10 * Math.cos(theta * Math.PI / 180) * Math.cos(phi * Math.PI / 180)
    const x = 10 * Math.cos(theta * Math.PI / 180) * Math.sin(phi * Math.PI / 180)
    const y = 10 * Math.sin(theta * Math.PI / 180)
    camara.eye = [x, y, z]

    document.getElementById('rot_cam_x').value = value + " grados"
}