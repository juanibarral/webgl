class Camera {
    constructor(gl_canvas) {
        this.uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
        this.projectionMatrix
        this.uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix')
        this.modelViewMatrix

        this.fieldOfView = 45 * Math.PI / 180
        this.aspect = gl_canvas.clientWidth / gl_canvas.clientHeight
        this.zNear = 0.1
        this.zFar = 100.0

        this.rotCamY = 0
        this.rotCamX = 0
        this.rotCamZ = 0

        this.position = [0, 0, 0]
    }

    use() {
        this.modelViewMatrix = mat4.create()
        this.projectionMatrix = mat4.create();
        mat4.perspective(this.projectionMatrix,
            this.fieldOfView,
            this.aspect,
            this.zNear,
            this.zFar)
        mat4.translate(this.projectionMatrix,
            this.projectionMatrix,
            this.position)
        mat4.rotateX(this.projectionMatrix,
            this.projectionMatrix,
            this.rotCamX
        )
        mat4.rotateY(this.projectionMatrix,
            this.projectionMatrix,
            this.rotCamY
        )
        mat4.rotateZ(this.projectionMatrix,
            this.projectionMatrix,
            this.rotCamZ
        )
        gl.uniformMatrix4fv(
            this.uProjectionMatrix,
            false,
            this.projectionMatrix)
        gl.uniformMatrix4fv(
            this.uModelViewMatrix,
            false,
            this.modelViewMatrix)
    }

    rotX(value) {
        this.rotCamX = value * Math.PI / 180
    }
    rotY(value) {
        this.rotCamY = value * Math.PI / 180
    }
    rotZ(value) {
        this.rotCamZ = value * Math.PI / 180
    }
    translate(x, y, z) {
        this.position = [x, y, z]
    }
}