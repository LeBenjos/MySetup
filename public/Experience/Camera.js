import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import Experience from "./Experience"

export default class Camera{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

        // Set Camera Instance and Controls
        this.setInstance()
        this.setControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspectRatio, 
            0.1, 
            100)
        this.instance.position.set(6, 4, 8)
        // this.instance.lookAt(new THREE.Vector3(0, 0, 0))

        this.scene.add(this.instance)

        if(this.debug.active){
            this.debugFolder.add(this.instance.position, 'x').min(-10).max(10).step(0.01).name("PositionX")
            this.debugFolder.add(this.instance.position, 'y').min(-10).max(10).step(0.01).name("PositionY")
            this.debugFolder.add(this.instance.position, 'z').min(-10).max(10).step(0.01).name("PositionZ")
        }
    }

    setControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}