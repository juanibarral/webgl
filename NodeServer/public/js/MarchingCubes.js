import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js'
class MarchingCubes {
    constructor() {
        this.mesh

//                 v7_______e6_____________v6
//                  /|                    /|
//                 / |                   / |
//              e7/  |                e5/  |
//               /___|______e4_________/   |
//            v4|    |                 |v5 |e10
//              |    |                 |   |
//              |    |e11              |e9 |
//            e8|    |                 |   |
//              |    |_________________|___|
//              |   / v3      e2       |   /v2
//              |  /                   |  /
//              | /e3                  | /e1
//              |/_____________________|/
//              v0         e0          v1

        const v0 = new THREE.Vector3(-0.5, -0.5,  0.5)
        const v1 = new THREE.Vector3( 0.5, -0.5,  0.5)
        const v2 = new THREE.Vector3( 0.5, -0.5, -0.5)
        const v3 = new THREE.Vector3(-0.5, -0.5, -0.5)
        const v4 = new THREE.Vector3(-0.5,  0.5,  0.5)
        const v5 = new THREE.Vector3( 0.5,  0.5,  0.5)
        const v6 = new THREE.Vector3( 0.5,  0.5, -0.5)
        const v7 = new THREE.Vector3(-0.5,  0.5, -0.5)

        const e0 = new THREE.Vector3( 0.0, -0.5,  0.5)
        const e1 = new THREE.Vector3( 0.5, -0.5,  0.0)
        const e2 = new THREE.Vector3( 0.0, -0.5, -0.5)
        const e3 = new THREE.Vector3(-0.5, -0.5,  0.0)
        const e4 = new THREE.Vector3( 0.0,  0.5,  0.5)
        const e5 = new THREE.Vector3( 0.5,  0.5,  0.0)
        const e6 = new THREE.Vector3( 0.0,  0.5, -0.5)
        const e7 = new THREE.Vector3(-0.5,  0.5,  0.0)
        const e8 = new THREE.Vector3(-0.5,  0.0,  0.5)
        const e9 = new THREE.Vector3( 0.5,  0.0,  0.5)
        const e10 = new THREE.Vector3(0.5,  0.0, -0.5)
        const e11 = new THREE.Vector3(-0.5,  0.0, -0.5)

        this.cube01 = [e0, e8, e3]
        this.cube02 = [e0, e1, e9, e8, e4, e7]
        this.cube03 = [e11, e2, e3, e9, e5, e4]
        this.cube04 = [e11, e2, e3, e0, e1, e9, e8, e4, e7]
        this.cube05 = [e0, e8, e3, e1, e2, e10, e8, e4, e7, e10, e6, e5]
        this.cube06 = [e2, e9, e0, e9, e2, e10, e8, e4, e11, e11, e4, e6]
        this.cube07 = [e0, e8, e3]
        this.cube08 = [e0, e1, e9, e8, e4, e7]
        this.cube09 = [e9, e8, e11, e9, e11, e10]
        this.cube10 = [e8, e4, e7, e0, e2, e9, e9, e2, e10]
        this.cube11 = [e0, e8, e3]
        this.cube12 = [e0, e8, e11, e0, e11, e2]
        this.cube13 = [e3, e2, e8, e4, e10, e5, e8, e2, e10, e8, e10, e4]
    }

    createCubeGeometry(points) {
        const cubeGeometry = new THREE.Geometry()
        cubeGeometry.vertices = points
        for (let i = 0; i < points.length; i+=3) {
            cubeGeometry.faces.push(new THREE.Face3(i, i + 1, i + 2))
        }
        cubeGeometry.computeBoundingSphere()
        return cubeGeometry
    }

    getMesh(material) {
        return new THREE.Mesh(this.createCubeGeometry(this.cube11), material)
    }

    addCube(material, scale, position, checks) {
        const base = {
            '10000000' : this.cube01,
            '10110111' : this.cube02,
            '11101011' : this.cube03,
            '10100111' : this.cube04,
            '10100101' : this.cube05,
            '01101001' : this.cube06,
            '01100000' : this.cube07,
            '01111000' : this.cube08,
            '11110000' : this.cube09,
            '01101000' : this.cube10,
            '10010001' : this.cube11,
            '01101111' : this.cube12,
            '11100110' : this.cube13,
        }
        let mesh
        console.log(checks)
        if (checks !== '00000000' && base[checks]) {
            mesh = new THREE.Mesh(this.createCubeGeometry(base[checks]), material)
            mesh.scale.x = scale
            mesh.scale.y = scale
            mesh.scale.z = scale
    
            mesh.position.x = position[0]
            mesh.position.y = position[1]
            mesh.position.z = position[2]
        }
        
        return mesh
    }
}

export { MarchingCubes }