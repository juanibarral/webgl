class Cone {
    constructor(radius, height, res) {
        const step = 360 / res
        const vertexSize = (res + 1) * 3

        this.rawVertices = [
            0.0, 0.0, 0.0,
            0.0, height, 0.0            
        ]

        // Calcular todos los vertices
        for( let i = 0; i < res; i++) {
            const angle = (step * i) * Math.PI / 180
            this.rawVertices.push(Math.cos(angle) * radius)
            this.rawVertices.push(0.0)
            this.rawVertices.push(Math.sin(angle) * radius)
        }

        // Create VertexArray
        this.vertices = Float32Array.from(this.rawVertices)

        this.vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)

        // Calcular los indices de la base
        this.baseIndices = new Uint16Array(res * 3)
        let index = 0
        for( let i = 0; i < res * 3; i+=3) {
            this.baseIndices[i] = 0
            this.baseIndices[i + 1] = index + 2
            this.baseIndices[i + 2] = index + 3
            if ( i === (res -1) * 3) {
                this.baseIndices[i + 2] = 2
            }
            index++
        }

        this.baseBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.baseBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.baseIndices, gl.STATIC_DRAW)

        // Calcular los indices del cuerpo
        this.bodyIndices = new Uint16Array(res * 3)
        index = 0
        for( let i = 0; i < res * 3; i+=3) {
            this.bodyIndices[i] = 1
            this.bodyIndices[i + 1] = index + 3
            this.bodyIndices[i + 2] = index + 2
            if ( i === (res -1) * 3) {
                this.bodyIndices[i + 1] = 2
            }
            index++
        }

        this.bodyBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bodyBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.bodyIndices, gl.STATIC_DRAW)

        const aColor = gl.getAttribLocation(program, 'aColor')
        gl.vertexAttrib4f(aColor, 1.0, 1.0, 1.0, 1.0)

        // Crear colores aleatorios por vertice
        this.colors = new Float32Array((this.baseIndices.length + this.bodyIndices.length) * 4)
        for (let i = 0; i < this.baseIndices.length + this.bodyIndices.length; i+=4) {
            this.colors[i] = Math.random()
            this.colors[i + 1] = Math.random()
            this.colors[i + 2] = Math.random()
            this.colors[i + 3] = 1.0
        }
        this.colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW)
        
        console.log({
            size: this.baseIndices,
            colors: this.colors
        })
    }
    draw() {
        const aPos = gl.getAttribLocation(program, 'aPos')
        const aColor = gl.getAttribLocation(program, 'aColor')
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aPos)

        // gl.disableVertexAttribArray(aColor)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aColor)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.baseBuffer)
        gl.drawElements(gl.TRIANGLES, this.baseIndices.length, gl.UNSIGNED_SHORT, 0)

        // gl.disableVertexAttribArray(aColor)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, this.baseIndices * 4)
        gl.enableVertexAttribArray(aColor)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bodyBuffer)
        gl.drawElements(gl.TRIANGLES, this.bodyIndices.length, gl.UNSIGNED_SHORT, 0)

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
        // gl.drawArrays(gl.POINTS, 0, this.vertices.length / 3)
    }
}

