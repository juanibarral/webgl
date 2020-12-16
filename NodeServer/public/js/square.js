class Square {
    constructor() {
        // Vertices
        this.vertices = new Float32Array([
            -3.0, -3.0, 0.0,
             3.0, -3.0, 0.0,
             3.0,  3.0, 0.0,
            -3.0,  3.0, 0.0
        ])
        this.bufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId)
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
        
        // Colores
        this.colors = new Float32Array([
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0
        ])
        this.colorBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW)

        this.texCoords = new Float32Array([
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ])
        this.texBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, this.texCoords, gl.STATIC_DRAW)

         // Indices
        this.indices = new Uint16Array([
            0, 1, 2,
            0, 2, 3
        ])
        this.bufferIndices = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW)

        // Crear una textura
        this.texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this.texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([255, 255, 0, 255]))
        
        var _this = this
        var image = new Image();
        image.src = "img/base_texture.png";
        image.addEventListener('load', function() {
            gl.bindTexture(gl.TEXTURE_2D, _this.texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
            gl.generateMipmap(gl.TEXTURE_2D)
        });
    }
    draw() {
        const aPos = gl.getAttribLocation(program, 'aPos')
        const aColor = gl.getAttribLocation(program, 'aColor')
        const aTexcoord = gl.getAttribLocation(program, 'aTexcoord')
        const uTexture = gl.getUniformLocation(program, 'uTexture')

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferId)
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aPos)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferId)
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aColor)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBufferId)
        gl.vertexAttribPointer(aTexcoord, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aTexcoord)
        gl.uniform1i(uTexture, 0);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0)
    }
}
