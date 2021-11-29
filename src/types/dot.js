import Starback from ".."
import { cosDeg, randomNumber, sinDeg } from './../utils'

class Dot {
    /**
     * Collection of stars
     * @param
     */
    stars = []
    config = null
    direction = 45

    /** @type {HTMLCanvasElement} */
    canvas = null

    /** @type {CanvasRenderingContext2D} */
    ctx = null
    
    constructor(canvas, config) {
        this.config = config
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }
    draw() {
        for(let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i]

            this.ctx.beginPath()
            this.ctx.fillStyle = "white"
            this.ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.closePath()
        }
    }
    update() {
        let dx = sinDeg(this.direction)
        let dy = cosDeg(this.direction)
    }
    generate(amount) {
        for(let i = 0; i < amount; i++) {
            let x = randomNumber(0, this.canvas.width)
            let y = randomNumber(0, this.canvas.height)
            this.stars.push({
                x,
                y,   
            })
        }
        console.log(this.stars)
        console.log('generate dot', amount)
    }
}

export default Dot