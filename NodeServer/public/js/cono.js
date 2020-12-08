class Cone {
    constructor(radius, height, res) {
        const step = 360 / res
        const vertexSize = (res + 1) * 3

        const rawVertices = [
            0.0, 0.0, height            
        ]

        // Calcular todos los vertices
        let index = 0;
        for( let i = 3; i <= vertexSize; i+=3) {
            const angle = (step * index) * Math.PI / 180
            rawVertices.push(Math.cos(angle) * radius)
            rawVertices.push(0.0)
            rawVertices.push(Math.sin(angle) * radius)
            
            index++
        }

        for( let i = 0; i < rawVertices.length; i++) {
            console.log({
                i: i,
                vertice: rawVertices[i]
            })
        }

        this.baseVertices = new Float32Array(vertexSize + 3)
        this.baseVertices[0] = 0.0
        this.baseVertices[1] = 0.0
        this.baseVertices[2] = 0.0


        for( let i = 3; i < vertexSize; i++) {
            this.baseVertices[i] = rawVertices[i]
        }

        this.baseVertices[this.baseVertices.length - 3] = rawVertices[rawVertices.length - 3]
        this.baseVertices[this.baseVertices.length - 2] = rawVertices[rawVertices.length - 2]
        this.baseVertices[this.baseVertices.length - 1] = rawVertices[rawVertices.length - 1]

        
        this.baseBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.baseBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.baseVertices, gl.STATIC_DRAW)

        console.log({
            length: this.baseVertices.length,
            vertices: this.baseVertices.length / 3
        })
        for( let i = 0; i < this.baseVertices.length; i++) {
            console.log({
                i: i,
                baseVertex: this.baseVertices[i]
            })
        }


        this.color = new Float32Array(this.baseVertices.length / 3 * 4)
        for(let i = 0; i < this.color.length; i++){
            this.color[i] = 1.0
        }

        this.colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, this.color, gl.STATIC_DRAW)
    }
    draw() {
        const aPos = gl.getAttribLocation(program, 'aPos')
        const aColor = gl.getAttribLocation(program, 'aColor')
        gl.bindBuffer(gl.ARRAY_BUFFER, this.baseBuffer)
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aPos)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(aColor)

        gl.drawArrays(gl.LINE_STRIP, 0, this.baseVertices.length / 3)
        // gl.drawArrays(gl.TRIANGLE_FAN, 0, this.baseVertices.length / 3)
    }
}

