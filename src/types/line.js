class Line {
    stars = []

    constructor() {

    }
    draw() {
        this.ctx.strokeStyle = 'white'
        this.stars.forEach((star) => {
        // Add to front of stars with callback
        this.behindCallbacks.forEach((cb) => cb(ctx))

        // draw the stars
        let starColor
        if (typeof this.starColor == 'object') {
            starColor = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height)
            this.starColor.forEach((color, index) => starColor.addColorStop(index / this.starColor.length, color))
        } else starColor = this.starColor

        // pathway with berzier curve
        this.ctx.save()
        this.ctx.strokeStyle = starColor
        this.ctx.beginPath()
        this.ctx.moveTo(star.start.x, star.start.y)
        this.ctx.setLineDash([this.starSize, star.startPoint * this.frequency])
        this.ctx.lineDashOffset = this.directionY * (star.progress + star.length)
        this.ctx.quadraticCurveTo(star.curve.x, star.curve.y, star.end.x, star.end.y)
        this.ctx.stroke()
        this.ctx.closePath()
        this.ctx.restore()

        // Add to front of stars with callback
        this.frontCallbacks.forEach((cb) => cb(this.ctx))

        // Draw FPS (development only)
        if (this.showFps) this.drawFps()

        })
    }
    update() {
        this.stars.map((star, index) => {
            star.progress += star.speed
            // if(star.y - star.height > this.canvas.height) return stars.splice(index,1)
        })
    }
    
  generate() {
    const x = this.randomNumber(-20, this.canvas.width)
    const y = x <= 0 ? this.randomNumber(0, this.canvas.height) : 0
    const height = this.starSize
    const endX = x + (this.canvas.width * this.distanceX + this.spread * x * this.directionX)
    const adjacentWidth = endX - x
    const length = this.canvas.height

    this.stars.push({
      x,
      y,
      length,
      height,
      progress: 0,
      speed: this.speed + Math.random() / 5,
      lineDash: this.randomNumber(50, 100),
      filter: {
        opacity: this.randomArr([this.randomNumber(20, 100) + '%', false]),
      },
      start: {
        x,
        y,
      },
      curve: {
        x: x + adjacentWidth * this.slope.x,
        y: y + this.canvas.height * this.slope.y,
      },
      startPoint: this.randomNumber(10, 100),
      end: {
        x: endX,
        y: this.canvas.height,
      },
    })
    return this.stars
  }
    
}

export default Line