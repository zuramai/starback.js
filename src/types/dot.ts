import { StarDotConfig, StarType } from "../types"
import { cosDeg, randomArr, randomNumber, sinDeg } from '../utils'

class Dot implements StarType {
    /**
     * Collection of stars
     * @param
     */
    stars = []
    type: 'dot'
    config: StarDotConfig = {
        quantity: 100,
        direction: 100,
        speed: [0.5, .8],
        backgroundColor: '#ccc',
        starColor: 'white',
        starSize: [0, 3],
    }
    overflowSize = 10


    /** @type {HTMLCanvasElement} */
    canvas = null

    /** @type {CanvasRenderingContext2D} */
    ctx = null
    
    constructor(canvas, config) {
        this.config = {...this.config, ...config}
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        
    }
    draw() {
        
        for(let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i]
            

            this.ctx.beginPath()
            this.ctx.fillStyle = this.config.starColor
            this.ctx.save()
            this.ctx.globalAlpha = star.opacity
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.restore()
            this.ctx.closePath()
        }
    }
    update() {
        let dx = sinDeg(this.config.direction) 
        let dy = cosDeg(this.config.direction) 
        
        for(let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i]
            star.x += dx * star.speed
            star.y += dy * star.speed

            // When the star location is outside the canvas, replace the star with a new one
            if(star.x > this.canvas.width + this.overflowSize || 
                star.x < 0 - this.overflowSize ||
                star.y > this.canvas.height + this.overflowSize ||
                star.y < 0 - this.overflowSize) {

                    this.stars.splice(i, 1)
                    
                    let x, y, startX

                    // If the direction is top or bottom
                    if(dy == -1 || dy == 1) {
                        startX = 0
                        x = randomNumber(startX, this.canvas.width)
                        y = dy == 1 ? 0 : this.canvas.height
                    }
                    // If the direction is right or left
                    else if(dx == -1 || dx == 1) {
                        startX = dx == 1 ? 0 : this.canvas.width
                        x = startX + (this.overflowSize * -dx)
                        y = randomNumber(0, this.canvas.height)
                    }
                    // If the direction is bottom-right
                    else if(dx > 0  && dy > 0) {
                        startX = -this.overflowSize
                        x = randomArr([startX, randomNumber(startX, this.canvas.width - this.overflowSize)])
                        y = x == startX ? randomNumber(startX, this.canvas.height - this.overflowSize) : -this.overflowSize
                    } 
                    // If the direction is bottom-left
                    else if(dx < 0  && dy > 0) {
                        startX = -this.canvas.width + this.overflowSize
                        x = randomArr ([startX, randomNumber(startX, 0 + this.overflowSize)])
                        y = x == startX ? randomNumber(startX, 0 - this.canvas.height + this.overflowSize) : -this.overflowSize
                    } 
                    // If the direction is top-left
                    else if (dx < 0  && dy < 0) {
                        startX = this.canvas.width + this.overflowSize
                        x = randomArr([startX, randomNumber(startX, 0 + this.overflowSize)])
                        y = x == startX ? randomNumber(startX, 0 + this.overflowSize) : this.canvas.height + this.overflowSize
                    }
                    // If the direction is top-right
                    else if (dx > 0  && dy < 0) {
                        startX = -this.overflowSize
                        x = randomArr([startX, randomNumber(startX, this.canvas.width-this.overflowSize)])
                        y = x == startX ? randomNumber(startX, this.canvas.height - this.overflowSize) : this.canvas.height + this.overflowSize
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
            let newStar = {
                x, 
                y, 
                size: this.randomSize(), 
                opacity: this.randomOpacity(),
                speed: this.randomSpeed()
            }
            
            return this.stars.push(newStar)
            
        }
        
        // If no location provided, it will generate stars in random locations.
        for(let i = 0; i < amount; i++) {
            let x = randomNumber(0, this.canvas.width)
            let y = randomNumber(0, this.canvas.height)
            

            this.stars.push({
                x,
                y,   
                size: this.randomSize(),
                opacity: this.randomOpacity(),
                speed: this.randomSpeed()
            })
        }

    }
    randomSize() {
        return typeof this.config.starSize == 'object' ? randomNumber(this.config.starSize[0], this.config.starSize[1]) : this.config.starSize
    }
    randomOpacity() {
        let opacity = this.config.randomOpacity
        if(typeof opacity == 'boolean') 
            return !opacity ? 1 : (opacity ? Math.random() : 1).toFixed(2)
        else 
            return (Math.random() * (opacity[1] - opacity[0]) + opacity[0]).toFixed(2)
    }
    randomSpeed() {
        const speed = this.config.speed
        
        return typeof Array.isArray(speed) ? Math.random() * (speed[1] - speed[0]) + speed[0] : speed
    }
}

export default Dot