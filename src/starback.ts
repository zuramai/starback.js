import { StarbackConfig, StarbackInterface, StarType } from "./types"
import Dot from "./types/dot"
import Line from "./types/line"

/**
 * Default Config
 * @type {Object}
 */
const StarbackDefaultConfig: StarbackConfig = {
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
export default class Starback implements StarbackInterface {
  static DefaultConfig = StarbackDefaultConfig
  
  private ctx
  public config: StarbackConfig = {}
  public stars: StarType = null
  public canvas = null
  public starTypes = {
    'dot': Dot,
    'line': Line
  }
  public fps = 0
  private repeat = 0

  private lastCalledTime = 0
  private lastGenerated = 0
  private frontCallbacks: Function[] = []
  private behindCallbacks: Function[] = []


  /**
   * Starback library
   * @param {HTMLElement|string} Canvas element or the selector
   * @param {Object} options
   */
  constructor(canvas: HTMLCanvasElement|string, config = {}) {
    this.canvas = canvas instanceof HTMLCanvasElement ? canvas : document.querySelector(canvas)

    this.ctx = this.canvas.getContext('2d')

    // merge config
    this.mergeConfig(config)

    // storing callbacks
    this.frontCallbacks = []
    this.behindCallbacks = []


    this.init()
  }

  static create(canvas: HTMLCanvasElement|string, config: StarbackConfig = {}) {
    return new Starback(canvas, config)
  }

  /**
   * Merge Config
   * @param  {StarbackDefaultConfig|object} instanceConfig
   */
  private mergeConfig(instanceConfig) {
    // merge config
    let config = {...StarbackDefaultConfig, ...instanceConfig}
    
    // apply config
    this.config = config
  }

  /**
   * Initialize canvas before render
   */
  private init() {
    this.canvas.setAttribute('width', this.config.width)
    this.canvas.setAttribute('height', this.config.height)
    this.stars = new this.starTypes[this.config.type](this.canvas, this.config)

    this.generateStar()

    requestAnimationFrame((t) => this.render(t))
  }
  
  
  /**
   * Set background for the whole canvas
   */
  private setBackground() {
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
  private draw() {
    this.behindCallbacks.forEach(cb => cb(this.ctx))
    this.stars.draw()
    this.frontCallbacks.forEach(cb => cb(this.ctx))

    // Show FPS if config.showFps is enabled
    if (this.config.showFps) this.drawFps()
  }

  /**
   * Update everything in the canvas frame including stars
   */
  private update() {
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
  private drawFps() {
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`${this.fps} fps`, 10, 10)
  }


  /**
   * Canvas render function
   * @param {DOMHighResTimeStamp} timestamp 
   */
  private render(timestamp) {
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
