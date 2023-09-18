import * as THREE from 'three'
import Experience from "../Experience";

export default class TestModel{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.logo
        this.time = this.experience.time
        this.debug = this.experience.debug

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Logo Model')
        }

        this.setTexture()
        this.setModel()
    }
    
    setTexture(){
        this.textures = {}

        this.textures.matcap = this.resources.items.matcapTexture
    }

    setModel(){
        const material = new THREE.MeshMatcapMaterial()
        this.model = this.resource.scene
        this.model.rotationSpeed = 0.0001

        this.model.traverse((child) => {
            if(child.isMesh && child.material.isMaterial){
                child.material = material
                child.material.matcap = this.textures.matcap
            }

            if(child.isMesh){
                child.castShadow = true
            }
        })

        this.scene.add(this.model)

        if(this.debug.active){
            this.debugFolder.add(this.model.position, 'x').min(-10).max(10).step(0.01).name('PositionX')
            this.debugFolder.add(this.model.position, 'y').min(-10).max(10).step(0.01).name('PositionY')
            this.debugFolder.add(this.model.position, 'z').min(-10).max(10).step(0.01).name('PositionZ')
            this.debugFolder.add(this.model, 'rotationSpeed').min(0.0001).max(0.0005).step(0.0001).name('RotationSpeed')
        }
    }

    update(){
        this.model.rotation.y = this.time.elapsed * this.model.rotationSpeed
    }
}