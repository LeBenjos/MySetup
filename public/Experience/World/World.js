import Experience from "../Experience"
import Environment from "./Environment"
import TestModel from "./TestModel"


export default class World{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup Models
            this.testModel = new TestModel()

            // Setup Environment
            this.environment = new Environment()
        })
    }

    update(){
        if(this.testModel){
            this.testModel.update()
        }
    }
}