class Camera {
    constructor() {
        this.uViewMatrix = gl.getUniformLocation(program, 'uViewMatrix')
        this.viewMatrix = mat4.create()
        this.uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix')
        
        this.fieldOfView = 45 * Math.PI / 180
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
        this.zNear = 0.1
        this.zFar = 100.0
        this.projectionMatrix = mat4.create()
        mat4.perspective(this.projectionMatrix,
            this.fieldOfView,
            this.aspect,
            this.zNear,
            this.zFar);
        this.eye = [0, 0, 10]
        this.center = [0, 0, 0]
        this.up = [0, 1, 0]
    }
    
    use() {
        mat4.lookAt(this.viewMatrix,
            this.eye,
            this.center,
            this.up)
        gl.uniformMatrix4fv(
            this.uViewMatrix,
            false,
            this.viewMatrix);
        gl.uniformMatrix4fv(
            this.uProjectionMatrix,
            false,
            this.projectionMatrix);
    }
}