import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter{
    constructor(){
        super()

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspectRatio = this.width / this.height
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.aspectRatio = this.width / this.height
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })
    }
}