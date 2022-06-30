import { StarLineConfig, StarType } from '../types'
import {  randomArr, randomNumber } from '../utils'

class Line implements StarType {
    /**
     * Collection of stars
     * @param
     */
    stars = []
    config: StarLineConfig = {
      type: 'line',  
      slope: { x: 1, y: 1},
      frequency: 10,
      speed: 2,
      starSize: 100,
      starColor: ['#fb00ff', '#00dde0'],
      spread: 1,
      directionY: -1, // 1 = top-to-bottom, 2 = bottom-to-top
      directionX: 1, // 1 = left-to-right, 2 = right-to-left
      distanceX: 0.1,
      quantity: 200
    }
    direction = 225

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
        this.ctx.strokeStyle = 'white'
        this.stars.forEach((star) => {
          // draw the stars
          let starColor
          if (Array.isArray(this.config.starColor)) {
              starColor = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height)
              this.config.starColor.forEach((color, index) => starColor.addColorStop(index / this.config.starColor.length, color))
          } else starColor = this.config.starColor

          // pathway with berzier curve
          this.ctx.save()
          this.ctx.strokeStyle = starColor
          this.ctx.beginPath()
          this.ctx.moveTo(star.start.x, star.start.y)
          this.ctx.setLineDash([this.config.starSize, star.startPoint * this.config.frequency])
          this.ctx.lineDashOffset = this.config.directionY * (star.progress + star.length)
          this.ctx.quadraticCurveTo(star.curve.x, star.curve.y, star.end.x, star.end.y)
          this.ctx.stroke()
          this.ctx.closePath()
          this.ctx.restore()
        

        })
    }
    update() {
        this.stars.map((star, index) => {
            star.progress += star.speed
            // if(star.y - star.height > this.canvas.height) return stars.splice(index,1)
        })
    }
    
  generate() {

    for(let i = 0; i < this.config.quantity; i++) {
      const x = randomNumber(-20, this.canvas.width)
      const y = x <= 0 ? randomNumber(0, this.canvas.height) : 0
      const height = 100
      const endX = x + (this.canvas.width * this.config.distanceX + this.config.spread * x * this.config.directionX)
      const adjacentWidth = endX - x
      const length = this.canvas.height
  
      this.stars.push({
        x,
        y,
        length,
        height,
        progress: 0,
        speed: this.config.speed + Math.random() / 5,
        lineDash: randomNumber(50, 100),
        filter: {
          opacity: randomArr([randomNumber(20, 100) + '%', false]),
        },
        start: {
          x,
          y,
        },
        curve: {
          x: x + adjacentWidth * this.config.slope.x,
          y: y + this.canvas.height * this.config.slope.y,
        },
        startPoint: randomNumber(10, 100),
        end: {
          x: endX,
          y: this.canvas.height,
        },
      })
    }
    return this.stars
  }
    
}

export default Line