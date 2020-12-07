class Ejes {
    constructor() {
        this.vertices = new Float32Array(
            [
                0.0, 0.0, 0.0,
                10.0, 0.0, 0.0,
                0.0, 0.0, 0.0,
                0.0, 10.0, 0.0,
                0.0, 0.0, 0.0,
                0.0, 0.0, 10.0
            ]
        )
        this.buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)

        this.color = new Float32Array(
            [
                1.0, 0.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0
            ]
        )
        this.colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.color, gl.STATIC_DRAW)
    }
    draw() {
        const aPos = gl.getAttribLocation(program, 'aPos')
        const aColor = gl.getAttribLocation(program, 'aColor')
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aPos)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aColor)

        gl.drawArrays(gl.LINES, 0, 6)
    }
}

