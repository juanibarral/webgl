let canvas
let gl
window.onload = init

function init() {
    // Etapa de Inicializacion
    canvas = document.getElementById("gl-canvas")
    gl = WebGLUtils.setupWebGL(canvas)

    let program = InitShaders(gl, "vertex-shader", "fragment-shader")
    let aPos = gl.getAttribLocation(program, 'aPos')
    let aColor = gl.getAttribLocation(program, 'aColor')
    // Matriz de modelo
    let uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')
    let modelMatrix = mat4.create()

    // Matrix de vista
    let uViewMatrix = gl.getUniformLocation(program, 'uViewMatrix')
    let viewMatrix = mat4.create()
    let eye = [0, 0, 3]
    let center = [0, 0, 0]
    let up = [0, 1, 0]
    mat4.lookAt(
        viewMatrix,
        eye,
        center,
        up
    )
    // Matriz de proyección
    let uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
    let projectionMatrix = mat4.create()
    const fov = 45 * Math.PI / 180
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const zNear = 0.1
    const zFar = 100.0
    mat4.perspective(
        projectionMatrix,
        fov,
        aspect,
        zNear,
        zFar
    )

    let vertices = {
        data: '',
        bufferId: ''
    }

    vertices.data = new Float32Array([
        -0.30, -0.60,
        0.30, -0.60,
        0.60, 0.0,
        0.30, 0.60, 
        -0.30, 0.60,
        -0.60, 0.0
    ])

    vertices.bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, vertices.data, gl.STATIC_DRAW)

    let colors = {
        data: '',
        bufferId: ''
    }

    colors.data =  new Float32Array(
    [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ])

    colors.bufferId = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId)
    gl.bufferData(gl.ARRAY_BUFFER, colors.data, gl.STATIC_DRAW)


    // Etapa de Rendering
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices.bufferId)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, colors.bufferId)
    gl.enableVertexAttribArray(aColor)
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)

    gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix)
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix)
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 10)

}