var canvas;
var gl;
window.onload = init;
var vertices

var program

var aPos
var uModelMatrix
var uViewMatrix
var uProjectionMatrix

var modelMatrix
var viewMatrix
var projectionMatrix

var uRange

function init() {
    // ****************************************
    // ETAPA DE INICIALIZACION
    // ****************************************
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn’t available"); }

    program = InitShaders(gl, "vertex-shader", "fragment-shader");
    aPos = gl.getAttribLocation(program, "aPos"); // Posición de los vértices
    uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')
    uViewMatrix = gl.getUniformLocation(program, 'uViewMatrix')
    uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
    uRange = gl.getUniformLocation(program, 'uRange')
    modelMatrix = mat4.create()
    viewMatrix = mat4.create()
    const eye = [30, 30, 30]
    const center = [0, 0, 0]
    const up = [0, 1, 0]
    mat4.lookAt(viewMatrix,
        eye,
        center,
        up)
    const fieldOfView = 45 * Math.PI / 180;   // Radianes
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    vertices = {
        data: '', // Datos de los vertices
        bufferId: '' // Buffer para los datos
    };

    var w = 15
    var h = 15
    var rawVertices = []

    for (let i = -w; i < w; i++) {
        for (let j = -h; j < h; j++) {
            rawVertices.push(i, 0.0, j)
            rawVertices.push(i + 1, 0.0, j)
            rawVertices.push(i, 0.0, j + 1)

            rawVertices.push(i + 1, 0.0, j)
            rawVertices.push(i + 1, 0.0, j + 1)
            rawVertices.push(i, 0.0, j + 1)
        }   
    }


    vertices.data = Float32Array.from(rawVertices)
    vertices.bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.STATIC_DRAW);

    render()
}

var range = 0
var goUp = true
function render(){

    if (goUp) {
        range += 0.1
        if (range > 20)
            goUp = false
    } else {
        range -= 0.1
        if (range < 0)
            goUp = true
    }
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program);

    gl.uniform1f(uRange, range)
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

    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.data.length / 3)
    window.requestAnimFrame(render, canvas);
}
