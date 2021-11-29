import Starback from ".."
import { cosDeg, randomArr, randomNumber, sinDeg } from './../utils'

class Dot {
    /**
     * Collection of stars
     * @param
     */
    stars = []
    config = null
    direction = 45
    overflowSize = 10

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
            this.ctx.fillStyle = `rgba(255,255,255,${star.opacity})`
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.closePath()
        }
    }
    update() {
        let dx = sinDeg(this.direction) 
        let dy = cosDeg(this.direction) 

        for(let i = 0; i < this.config.quantity; i++) {
            let star = this.stars[i]
            // console.log(star.speed)
            star.x += dx * .5
            star.y += dy * .5

            // When the star location is outside the canvas, delete it and generate a new one
            if(star.x > this.canvas.width + this.overflowSize || 
                star.x < 0 - this.overflowSize ||
                star.y > this.canvas.height + this.overflowSize ||
                star.y < 0 - this.overflowSize) {
                    this.stars.splice(i, 1) 
                    let x, y

                    // If the direction is right-down
                    if(dx > 0  && dy > 0) {
                        x = randomArr([-this.overflowSize, randomNumber(-this.overflowSize, this.canvas.width - this.overflowSize)])
                        y = x == -this.overflowSize ? randomNumber(-this.overflowSize, this.canvas.height - this.overflowSize) : -this.overflowSize
                    }
                    let newStarLocation = {
                        x,
                        y
                    }
                    this.generate(1, newStarLocation)
                }
        }
    }
    generate(amount, location = null) {
        // Generate star in specific location
        if(location) {
            let { x, y } = location

            return this.stars.push({
                x, y, size: this.randomSize(), opacity: this.randomOpacity()
            })
        }

        // If no location provided, it will generate stars in random locations.
        for(let i = 0; i < amount; i++) {
            let x = randomNumber(0, this.canvas.width)
            let y = randomNumber(0, this.canvas.height)
            let speed = typeof this.config.speed == 'object' ? randomNumber(this.config.speed[0], this.config.speed[1]) : this.config.speed

            this.stars.push({
                x,
                y,   
                size: this.randomSize(),
                opacity: this.randomOpacity(),
                speed
            })
        }
        console.log(this.stars)
        console.log('generate dot', amount)
    }
    randomSize() {
        return typeof this.config.starSize == 'object' ? randomNumber(this.config.starSize[0], this.config.starSize[1]) : this.config.starSize
    }
    randomOpacity() {
        return this.config.randomOpacity ? Math.random() : 1
    }
}

export default Dot