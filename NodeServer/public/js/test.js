class Test {
    constructor() {
        // Vertices
        this.vertices = new Float32Array([
            3.0, 0.0, 0.0,
            0.0, 3.0, 0.0,
            -3.0, 0.0, 0.0
        ])
        this.bufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId)
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
        
        // Colores
        this.colors = new Float32Array([
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0
        ])
        this.colorBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW)
    }
    draw() {
        const aPos = gl.getAttribLocation(program, 'aPos')
        const aColor = gl.getAttribLocation(program, 'aColor')
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId)
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aPos)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferId)
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aColor)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}

// class Test {
//     constructor() {
//         this.vertices = new Float32Array([
//             3.0, 0.0, 0.0,
//             0.0, 3.0, 0.0,
//             -3.0, 0.0, 0.0
//         ])

//         this.colors = new Float32Array([
//             1.0, 0.0, 0.0, 1.0,
//             0.0, 1.0, 0.0, 1.0,
//             0.0, 0.0, 1.0, 1.0
//         ])
//         this.buffer = gl.createBuffer()
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
//         gl.bufferData(gl.ARRAY_BUFFER, 21 * 32, gl.STATIC_DRAW)
//         gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices)
//         gl.bufferSubData(gl.ARRAY_BUFFER, 9 * 32, this.colors)

//         const aColor = gl.getAttribLocation(program, 'aColor')
//         gl.vertexAttrib4f(aColor, 1.0, 1.0, 1.0, 1.0)
//     }
//     draw() {
//         const aPos = gl.getAttribLocation(program, 'aPos')
//         const aColor = gl.getAttribLocation(program, 'aColor')
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
//         gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
//         gl.enableVertexAttribArray(aPos)

//         gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
//         gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 9 * 32)
//         gl.disableVertexAttribArray(aColor)

//         gl.drawArrays(gl.TRIANGLES, 0, 3)
//     }
// }

// class Test {
//     constructor() {
//         // Vertices
//         this.vertices = new Float32Array([
//             3.0, 0.0, 0.0,
//             0.0, 3.0, 0.0,
//             -3.0, 0.0, 0.0
//         ])
//         this.bufferId = gl.createBuffer()
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId)
//         gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
        
//         // Colores
//         this.colors = new Float32Array([
//             1.0, 0.0, 0.0, 1.0,
//             1.0, 0.0, 0.0, 1.0,
//             1.0, 0.0, 0.0, 1.0
//         ])
//         this.colorBufferId = gl.createBuffer()
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferId)
//         gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW)

//         // Indices
//         this.indices = new Uint16Array([
//             0, 1, 2
//         ])
//         this.bufferIndices = gl.createBuffer()
//         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices)
//         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW)
//     }
//     draw() {
//         const aPos = gl.getAttribLocation(program, 'aPos')
//         const aColor = gl.getAttribLocation(program, 'aColor')
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId)
//         gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
//         gl.enableVertexAttribArray(aPos)

//         gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferId)
//         gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
//         gl.enableVertexAttribArray(aColor)

//         gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0)
//     }
// }