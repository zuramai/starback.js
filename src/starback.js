import Dot from "./types/dot"
import Line from "./types/line"

/**
 * Default Config
 * @type {Object}
 */
export const StarbackDefaultConfig = {
  width: 800,
  height: 600,
  
  randomOpacity: true,
  showFps: false,
  type: 'dot'
}

/**
 * Starback class wrapper
 * @class Starback
 */
export default class Starback {
  static DefaultConfig = StarbackDefaultConfig

  config = {}

  /**
   * Stores stars' class
   * @type {Dot|Line}
   */
  stars = null

  starTypes = {
    'dot': Dot,
    'line': Line
  }

  /**
   * Starback library
   * @param {HTMLElement|string} Canvas element or the selector
   * @param {Object} options
   */
  constructor(canvas, config = {}) {
    this.canvas = canvas instanceof HTMLElement ? canvas : document.querySelector(canvas)
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d')


    // merge config
    this.mergeConfig(config)

    //
    this.repeat = 0

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
  /**
   * Merge Config
   * @param  {StarbackDefaultConfig|object} instanceConfig
   */
  mergeConfig(instanceConfig) {
    // merge config
    let config = Object.assign(StarbackDefaultConfig, instanceConfig)
    
    // apply config
    this.config = config
    // this.width = config.width
    // this.height = config.height
    // this.speed = config.speed
    // this.direction = config.direction
    // // this.directionY = config.directionY
    // // this.directionX = config.directionX
    // this.starColor = config.starColor
    // this.maxStar = config.maxStar
    // this.slope = config.slope
    // this.starSize = config.starSize
    // this.showFps = config.showFps
    // this.config.backgroundColor = config.backgroundColor
    // this.distanceX = config.distanceX
    // this.frequency = config.frequency
    // this.randomOpacity = config.randomOpacity
    // this.spread = config.spread
    // this.type = config.type
  }

  /**
   * Initialize canvas before render
   */
  init() {
    this.canvas.setAttribute('width', this.config.width)
    this.canvas.setAttribute('height', this.config.height)
    this.stars = new this.starTypes[this.config.type](canvas, this.config)

    console.log(this.stars)
    this.config = Object.assign(this.stars.defaultConfig, this.config)
    this.stars.config = this.config

    console.log(this.starTypes, this.config.type)

    this.generateStar()

    requestAnimationFrame((t) => this.render(t))
  }
  
  
  /**
   * Set background for the whole canvas
   */
  setBackground() {
    let bg

    if (typeof this.config.backgroundColor == 'string') bg = this.config.backgroundColor
    else if (typeof this.config.backgroundColor == 'object') {
      bg = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height)

      this.config.backgroundColor.forEach((bgString, index) => {
        bg.addColorStop(index / this.config.backgroundColor.length, bgString)
      })
    }
    this.ctx.fillStyle = bg
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Draw the frame into the canvas
   */
  draw() {
    this.behindCallbacks.forEach(cb => cb(this.ctx))
    this.stars.draw()
    this.frontCallbacks.forEach(cb => cb(this.ctx))

    // Show FPS if config.showFps is enabled
    if (this.showFps) this.drawFps()
  }

  /**
   * Update everything in the canvas frame including stars
   */
  update() {
    this.stars.update()
  }

  /**
   * Add an object in front of the stars
   * @param {Function} cb Callback function
   */
  addToFront(cb) {
    this.frontCallbacks.push(cb)
  }

  /**
   * Add an object behind the stars
   * @param {Function} cb Callback function
   */
  addToBehind(cb) {
    this.behindCallbacks.push(cb)
  }

  /**
   * The total quantity of stars in canvas
   * @param {Number} amount The number of stars
   */
  generateStar() {
    this.stars.generate(this.config.quantity)
  }

  /**
   * Draw the FPS in the canvas.
   */
  drawFps() {
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`${this.fps} fps`, 10, 10)
  }


  /**
   * Canvas render function
   * @param {DOMHighResTimeStamp} timestamp 
   */
  render(timestamp) {
    if (!this.lastCalledTime) this.lastCalledTime = timestamp

    let deltaTime = timestamp - this.lastCalledTime
    this.fps = Math.round(1000 / deltaTime)
    this.lastCalledTime = timestamp

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.setBackground()
    this.draw()
    this.update()

    requestAnimationFrame((t) => this.render(t))
  }

  
}
