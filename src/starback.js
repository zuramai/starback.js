
export default class Starback {
    /**
     * Starback library
     * @param {Object} args 
     */
    constructor({ 
        canvas, 
        width,
        height,
        speed = .5, 
        starColor = "rgba(200,200,200,.2)", 
        maxStar = 200,
        starSize = 100,
        directionY = 1, // 1 = top-to-bottom, 2 = bottom-to-top
        directionX = 1, // 1 = left-to-right, 2 = right-to-left
        distanceX = .1, // distance of the current start X
        slope = { x: 1, y: 1 },
        frequency = 10,
        spread = 1,
        randomOpacity = false,
        backgroundColor = "#ccc"
    }) {
        this.canvas = canvas instanceof HTMLElement ? canvas : document.querySelector(canvas) 
        /** @type {CanvasRenderingContext2D} */ this.ctx = this.canvas.getContext('2d')

        this.width = width
        this.height=  height

        this.speed = speed
        this.directionY = directionY*-1
        this.directionX = directionX
        this.starColor = starColor
        this.repeat = 0
        this.stars = []
        this.maxStar = maxStar
        this.slope = slope
        this.starSize = starSize
        this.showFps = true
        this.backgroundColor = backgroundColor
        this.distanceX = distanceX
        this.frequency = frequency
        this.randomOpacity = randomOpacity
        this.spread = spread

        // storing callbacks
        this.frontCallbacks = []
        this.behindCallbacks = []

        // for calculating fps
        this.fps = 0
        this.lastCalledTime = 0

        // time tracking
        this.lastGenerated = 0

        this.init()

    }
    init() {
        this.canvas.setAttribute('width', this.width)
        this.canvas.setAttribute('height', this.height)
        
        requestAnimationFrame(t => this.render(t))
        console.log(this.width,this.height)
    }
    update() {
        this.stars.map((star, index) => {
          star.progress += star.speed
          // if(star.y - star.height > this.canvas.height) return stars.splice(index,1)
        })
    }
    
    setBackground() {
        let bg

        if(typeof this.backgroundColor == "string") bg = this.backgroundColor
        else if(typeof this.backgroundColor == "object") {
            bg = this.ctx.createLinearGradient(this.canvas.width/2,0,  this.canvas.width/2, this.canvas.height)
            
            this.backgroundColor.forEach((bgString, index) => {
                bg.addColorStop(index/this.backgroundColor.length, bgString)
            })
        }
        
        this.ctx.fillStyle = bg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Get random number between two given number.
     * @param {Number} min Minimum Number
     * @param {Number} max Maximum Number
     * @returns {Number} The random number result
     */
    randomNumber(min,max) {
        return Math.floor(Math.random() * (max - min) + 1) + min
    }

    draw() {
        this.ctx.strokeStyle = "white"
        this.stars.forEach(star => {
            // Starts and ending point
            // this.ctx.beginPath()
            // this.ctx.fillStyle="red"
            // this.ctx.arc(star.start.x, star.start.y, 20, 0, Math.PI * 2)
            // this.ctx.arc(star.end.x, star.end.y, 20, 0, Math.PI * 2)
            // this.ctx.fill()
            // this.ctx.closePath()
            

            // Add to front of stars with callback
            this.behindCallbacks.forEach(cb => cb(ctx))

            // draw the stars
            let starGradient = this.ctx.createLinearGradient(0,0,this.canvas.width,this.canvas.height)
            starGradient.addColorStop(0,"hsla(299, 100%, 50%, 1)")
            starGradient.addColorStop(1,"hsla(181, 100%, 44%, 1)")

            // pathway with berzier curve
            this.ctx.save()
            this.ctx.strokeStyle = starGradient
            this.ctx.beginPath();
            this.ctx.moveTo(star.start.x, star.start.y)
            this.ctx.setLineDash([this.starSize,star.startPoint * this.frequency]);
            this.ctx.lineDashOffset = this.directionY*(star.progress+star.length);    
            this.ctx.quadraticCurveTo(
                star.curve.x,
                star.curve.y,
                star.end.x, star.end.y)
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.restore()


            // Add to front of stars with callback
            this.frontCallbacks.forEach(cb => cb(this.ctx))

            // Draw FPS (development only)
            if(this.showFps) this.drawFps()


            
            // bezier curve point
            // this.ctx.beginPath()
            // this.ctx.fillStyle="blue"
            // this.ctx.arc(star.curve.x, star.curve.y, 20, 0, Math.PI*2)
            // this.ctx.fill()
            // this.ctx.closePath()
          
        })
    }
    generateRandomStar() {
        let x = this.randomNumber(-20, this.canvas.width),
            y = x <= 0 ? this.randomNumber(0, this.canvas.height) : 0,
            height = this.starSize,
            endX = x + (this.canvas.width * (this.distanceX) + (this.spread * x) * this.directionX),
            adjacentWidth = endX - x,
            length = this.canvas.height
          
        this.stars.push({
          x, y,
          length,
          height,
          progress: 0,
          speed: this.speed + Math.random()/5,
          lineDash: this.randomNumber(50,100),
          filter: {
            opacity: this.randomArr([this.randomNumber(20,100)+"%", false])
          },
          start: {
            x, y
          },
          curve: {
              x: x + adjacentWidth * this.slope.x,
              y: y + this.canvas.height * this.slope.y
          },
          startPoint: this.randomNumber(10,100),
          end: {
            x: endX,
            y: this.canvas.height
          },
        })
        return this.stars
    }
    addToFront(cb) {
        this.frontCallbacks.push(cb)
    }
    generateStar(amount) {
        for(let i = 0; i < amount; i++) {
            this.generateRandomStar()
        }
    }
    drawFps() {
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`${this.fps} fps`, 10, 10)
    }
    render(timestamp) {
        if(!this.lastCalledTime) this.lastCalledTime = timestamp
        let deltaTime = (this.lastCalledTime - timestamp)
        this.fps = Math.round(1000/deltaTime)
        this.lastCalledTime = timestamp
        
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.setBackground()
        this.draw()
        this.update()

   
        requestAnimationFrame(t => this.render(t))
    }
    randomArr(arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    }
}
