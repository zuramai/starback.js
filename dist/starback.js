/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Starback"] = factory();
	else
		root["Starback"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _starback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./starback */ \"./src/starback.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_starback__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://Starback/./src/index.js?");

/***/ }),

/***/ "./src/starback.js":
/*!*************************!*\
  !*** ./src/starback.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StarbackDefaultConfig\": () => (/* binding */ StarbackDefaultConfig),\n/* harmony export */   \"default\": () => (/* binding */ Starback)\n/* harmony export */ });\n/* harmony import */ var _types_dot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/dot */ \"./src/types/dot.js\");\n/* harmony import */ var _types_line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/line */ \"./src/types/line.js\");\n\n\n/**\r\n * Default Config\r\n * @type {Object}\r\n */\n\nconst StarbackDefaultConfig = {\n  width: 800,\n  height: 600,\n  randomOpacity: true,\n  showFps: false,\n  type: 'dot'\n};\n/**\r\n * Starback class wrapper\r\n * @class Starback\r\n */\n\nclass Starback {\n  static DefaultConfig = StarbackDefaultConfig;\n  config = {};\n  /**\r\n   * Stores stars' class\r\n   * @type {Dot|Line}\r\n   */\n\n  stars = null;\n  starTypes = {\n    'dot': _types_dot__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    'line': _types_line__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  };\n  /**\r\n   * Starback library\r\n   * @param {HTMLElement|string} Canvas element or the selector\r\n   * @param {Object} options\r\n   */\n\n  constructor(canvas, config = {}) {\n    this.canvas = canvas instanceof HTMLElement ? canvas : document.querySelector(canvas);\n    /** @type {CanvasRenderingContext2D} */\n\n    this.ctx = this.canvas.getContext('2d'); // merge config\n\n    this.mergeConfig(config); //\n\n    this.repeat = 0; // storing callbacks\n\n    this.frontCallbacks = [];\n    this.behindCallbacks = []; // for calculating fps\n\n    this.fps = 0;\n    this.lastCalledTime = 0; // time tracking\n\n    this.lastGenerated = 0;\n    this.init();\n  }\n  /**\r\n   * Merge Config\r\n   * @param  {StarbackDefaultConfig|object} instanceConfig\r\n   */\n\n\n  mergeConfig(instanceConfig) {\n    // merge config\n    let config = Object.assign(StarbackDefaultConfig, instanceConfig); // apply config\n\n    this.config = config; // this.width = config.width\n    // this.height = config.height\n    // this.speed = config.speed\n    // this.direction = config.direction\n    // // this.directionY = config.directionY\n    // // this.directionX = config.directionX\n    // this.starColor = config.starColor\n    // this.maxStar = config.maxStar\n    // this.slope = config.slope\n    // this.starSize = config.starSize\n    // this.showFps = config.showFps\n    // this.config.backgroundColor = config.backgroundColor\n    // this.distanceX = config.distanceX\n    // this.frequency = config.frequency\n    // this.randomOpacity = config.randomOpacity\n    // this.spread = config.spread\n    // this.type = config.type\n  }\n  /**\r\n   * Initialize canvas before render\r\n   */\n\n\n  init() {\n    this.canvas.setAttribute('width', this.config.width);\n    this.canvas.setAttribute('height', this.config.height);\n    this.stars = new this.starTypes[this.config.type](canvas, this.config);\n    console.log(this.stars);\n    this.config = Object.assign(this.stars.defaultConfig, this.config);\n    this.stars.config = this.config;\n    console.log(this.starTypes, this.config.type);\n    this.generateStar();\n    requestAnimationFrame(t => this.render(t));\n  }\n  /**\r\n   * Set background for the whole canvas\r\n   */\n\n\n  setBackground() {\n    let bg;\n    if (typeof this.config.backgroundColor == 'string') bg = this.config.backgroundColor;else if (typeof this.config.backgroundColor == 'object') {\n      bg = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);\n      this.config.backgroundColor.forEach((bgString, index) => {\n        bg.addColorStop(index / this.config.backgroundColor.length, bgString);\n      });\n    }\n    this.ctx.fillStyle = bg;\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n  }\n  /**\r\n   * Draw the frame into the canvas\r\n   */\n\n\n  draw() {\n    this.frontCallbacks.forEach(cb => cb(this.ctx));\n    this.stars.draw();\n    this.behindCallbacks.forEach(cb => cb(this.ctx)); // Show FPS if config.showFps is enabled\n\n    if (this.showFps) this.drawFps();\n  }\n  /**\r\n   * Update everything in the canvas frame including stars\r\n   */\n\n\n  update() {\n    this.stars.update();\n  }\n  /**\r\n   * Add an object in front of the stars\r\n   * @param {Function} cb Callback function\r\n   */\n\n\n  addToFront(cb) {\n    this.frontCallbacks.push(cb);\n  }\n  /**\r\n   * Add an object behind the stars\r\n   * @param {Function} cb Callback function\r\n   */\n\n\n  addToBehind(cb) {\n    this.behindCallbacks.push(cb);\n  }\n  /**\r\n   * The total quantity of stars in canvas\r\n   * @param {Number} amount The number of stars\r\n   */\n\n\n  generateStar() {\n    this.stars.generate(this.config.quantity);\n  }\n  /**\r\n   * Draw the FPS in the canvas.\r\n   */\n\n\n  drawFps() {\n    this.ctx.fillStyle = 'white';\n    this.ctx.fillText(`${this.fps} fps`, 10, 10);\n  }\n  /**\r\n   * Canvas render function\r\n   * @param {DOMHighResTimeStamp} timestamp \r\n   */\n\n\n  render(timestamp) {\n    if (!this.lastCalledTime) this.lastCalledTime = timestamp;\n    let deltaTime = timestamp - this.lastCalledTime;\n    this.fps = Math.round(1000 / deltaTime);\n    this.lastCalledTime = timestamp;\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.setBackground();\n    this.draw();\n    this.update();\n    requestAnimationFrame(t => this.render(t));\n  }\n\n}\n\n//# sourceURL=webpack://Starback/./src/starback.js?");

/***/ }),

/***/ "./src/types/dot.js":
/*!**************************!*\
  !*** ./src/types/dot.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils */ \"./src/utils.js\");\n\n\n\nclass Dot {\n  /**\r\n   * Collection of stars\r\n   * @param\r\n   */\n  stars = [];\n  config = null;\n  direction = 225;\n  overflowSize = 10;\n  defaultConfig = {\n    quantity: 100,\n    direction: 100,\n    speed: [0.5, .8],\n    backgroundColor: '#ccc',\n    starColor: 'white',\n    starSize: [0, 3]\n  };\n  /** @type {HTMLCanvasElement} */\n\n  canvas = null;\n  /** @type {CanvasRenderingContext2D} */\n\n  ctx = null;\n\n  constructor(canvas, config) {\n    this.config = config;\n    this.direction = this.config.direction;\n    this.canvas = canvas;\n    this.ctx = canvas.getContext('2d');\n    let dx = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.sinDeg)(this.direction);\n    let dy = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.cosDeg)(this.direction);\n    console.log(dx, dy);\n  }\n\n  draw() {\n    for (let i = 0; i < this.stars.length; i++) {\n      let star = this.stars[i];\n      this.ctx.beginPath();\n      this.ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;\n      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);\n      this.ctx.fill();\n      this.ctx.closePath();\n    }\n  }\n\n  update() {\n    let dx = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.sinDeg)(this.direction);\n    let dy = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.cosDeg)(this.direction);\n\n    for (let i = 0; i < this.stars.length; i++) {\n      let star = this.stars[i]; // console.log(star.speed)\n\n      star.x += dx * star.speed;\n      star.y += dy * star.speed; // When the star location is outside the canvas, replace the star with a new one\n\n      if (star.x > this.canvas.width + this.overflowSize || star.x < 0 - this.overflowSize || star.y > this.canvas.height + this.overflowSize || star.y < 0 - this.overflowSize) {\n        this.stars.splice(i, 1);\n        let x, y, startX; // If the direction is top or bottom\n\n        if (dy == -1 || dy == 1) {\n          startX = 0;\n          x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, this.canvas.width);\n          y = dy == 1 ? 0 : this.canvas.height;\n        } // If the direction is right or left\n        else if (dx == -1 || dx == 1) {\n          startX = dx == 1 ? 0 : this.canvas.width;\n          x = startX + this.overflowSize * -dx;\n          y = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(0, this.canvas.height);\n        } // If the direction is bottom-right\n        else if (dx > 0 && dy > 0) {\n          startX = -this.overflowSize;\n          x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomArr)([startX, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, this.canvas.width - this.overflowSize)]);\n          y = x == startX ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, this.canvas.height - this.overflowSize) : -this.overflowSize;\n        } // If the direction is bottom-left\n        else if (dx < 0 && dy > 0) {\n          startX = -this.canvas.width + this.overflowSize;\n          x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomArr)([startX, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, 0 + this.overflowSize)]);\n          y = x == startX ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, 0 - this.canvas.height + this.overflowSize) : -this.overflowSize;\n        } // If the direction is top-left\n        else if (dx < 0 && dy < 0) {\n          startX = this.canvas.width + this.overflowSize;\n          x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomArr)([startX, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, 0 + this.overflowSize)]);\n          y = x == startX ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, 0 + this.overflowSize) : this.canvas.height + this.overflowSize;\n        } // If the direction is top-right\n        else if (dx > 0 && dy < 0) {\n          startX = -this.overflowSize;\n          x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomArr)([startX, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, this.canvas.width - this.overflowSize)]);\n          y = x == startX ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(startX, this.canvas.height - this.overflowSize) : this.canvas.height + this.overflowSize;\n        }\n\n        let newStarLocation = {\n          x,\n          y\n        };\n        this.generate(1, newStarLocation);\n      }\n    }\n  }\n\n  generate(amount, location = null) {\n    // Generate star in specific location\n    if (location) {\n      let {\n        x,\n        y\n      } = location;\n      let newStar = {\n        x,\n        y,\n        size: this.randomSize(),\n        opacity: this.randomOpacity(),\n        speed: this.randomSpeed()\n      };\n      return this.stars.push(newStar);\n    } // If no location provided, it will generate stars in random locations.\n\n\n    for (let i = 0; i < amount; i++) {\n      let x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(0, this.canvas.width);\n      let y = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(0, this.canvas.height);\n      this.stars.push({\n        x,\n        y,\n        size: this.randomSize(),\n        opacity: this.randomOpacity(),\n        speed: this.randomSpeed()\n      });\n    }\n\n    console.log(this.stars.map(s => s.speed));\n    console.log('generate dot', amount);\n  }\n\n  randomSize() {\n    return typeof this.config.starSize == 'object' ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(this.config.starSize[0], this.config.starSize[1]) : this.config.starSize;\n  }\n\n  randomOpacity() {\n    let opacity = this.config.randomOpacity;\n    if (typeof opacity == 'boolean') return (opacity ? Math.random() : 1).toFixed(2);else return (Math.random() * (opacity[1] - opacity[0]) + opacity[0]).toFixed(2);\n  }\n\n  randomSpeed() {\n    return typeof this.config.speed == 'object' ? Math.random() * (this.config.speed[1] - this.config.speed[0]) + this.config.speed[0] : this.config.speed;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dot);\n\n//# sourceURL=webpack://Starback/./src/types/dot.js?");

/***/ }),

/***/ "./src/types/line.js":
/*!***************************!*\
  !*** ./src/types/line.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils */ \"./src/utils.js\");\n\n\nclass Line {\n  /**\r\n   * Collection of stars\r\n   * @param\r\n   */\n  stars = [];\n  config = null;\n  direction = 225;\n  overflowSize = 10;\n  /** @type {HTMLCanvasElement} */\n\n  canvas = null;\n  /** @type {CanvasRenderingContext2D} */\n\n  ctx = null;\n  defaultConfig = {\n    slope: {\n      x: 1,\n      y: 1\n    },\n    frequency: 10,\n    speed: 2,\n    starSize: 100,\n    starColor: ['#fb00ff', '#00dde0'],\n    spread: 1,\n    directionY: -1,\n    // 1 = top-to-bottom, 2 = bottom-to-top\n    directionX: 1,\n    // 1 = left-to-right, 2 = right-to-left\n    distanceX: 0.1,\n    quantity: 200\n  };\n\n  constructor(canvas, config) {\n    this.config = config;\n    this.direction = this.config.direction;\n    this.canvas = canvas;\n    this.ctx = canvas.getContext('2d');\n  }\n\n  draw() {\n    this.ctx.strokeStyle = 'white';\n    this.stars.forEach(star => {\n      // draw the stars\n      let starColor;\n\n      if (typeof this.config.starColor == 'object') {\n        starColor = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);\n        this.config.starColor.forEach((color, index) => starColor.addColorStop(index / this.config.starColor.length, color));\n      } else starColor = this.config.starColor; // pathway with berzier curve\n\n\n      this.ctx.save();\n      this.ctx.strokeStyle = starColor;\n      this.ctx.beginPath();\n      this.ctx.moveTo(star.start.x, star.start.y);\n      this.ctx.setLineDash([this.config.starSize, star.startPoint * this.config.frequency]);\n      this.ctx.lineDashOffset = this.config.directionY * (star.progress + star.length);\n      this.ctx.quadraticCurveTo(star.curve.x, star.curve.y, star.end.x, star.end.y);\n      this.ctx.stroke();\n      this.ctx.closePath();\n      this.ctx.restore();\n    });\n  }\n\n  update() {\n    this.stars.map((star, index) => {\n      star.progress += star.speed; // if(star.y - star.height > this.canvas.height) return stars.splice(index,1)\n    });\n  }\n\n  generate() {\n    for (let i = 0; i < this.config.quantity; i++) {\n      const x = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(-20, this.canvas.width);\n      const y = x <= 0 ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(0, this.canvas.height) : 0;\n      const height = 100;\n      const endX = x + (this.canvas.width * this.config.distanceX + this.config.spread * x * this.config.directionX);\n      const adjacentWidth = endX - x;\n      const length = this.canvas.height;\n      this.stars.push({\n        x,\n        y,\n        length,\n        height,\n        progress: 0,\n        speed: this.config.speed + Math.random() / 5,\n        lineDash: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(50, 100),\n        filter: {\n          opacity: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomArr)([(0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(20, 100) + '%', false])\n        },\n        start: {\n          x,\n          y\n        },\n        curve: {\n          x: x + adjacentWidth * this.config.slope.x,\n          y: y + this.canvas.height * this.config.slope.y\n        },\n        startPoint: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.randomNumber)(10, 100),\n        end: {\n          x: endX,\n          y: this.canvas.height\n        }\n      });\n    }\n\n    console.log(this.stars);\n    return this.stars;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Line);\n\n//# sourceURL=webpack://Starback/./src/types/line.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomNumber\": () => (/* binding */ randomNumber),\n/* harmony export */   \"randomArr\": () => (/* binding */ randomArr),\n/* harmony export */   \"sinDeg\": () => (/* binding */ sinDeg),\n/* harmony export */   \"cosDeg\": () => (/* binding */ cosDeg)\n/* harmony export */ });\n/**\r\n * Get random number between two given number.\r\n * @param {Number} min Minimum Number\r\n * @param {Number} max Maximum Number\r\n * @returns {Number} The random number result\r\n*/\nfunction randomNumber(min, max) {\n  return Math.floor(Math.random() * (max - min) + 1) + min;\n}\nfunction randomArr(arr) {\n  return arr[Math.floor(Math.random() * arr.length)];\n}\n/**\r\n * Convert angle degree to sin degree\r\n * @param {*} angleDeg \r\n */\n\nfunction sinDeg(angleDeg) {\n  return Math.sin(angleDeg * (Math.PI / 180));\n}\n/**\r\n * Convert angle degree to cos degree\r\n * @param {*} angleDeg \r\n */\n\nfunction cosDeg(angleDeg) {\n  return Math.cos(angleDeg * (Math.PI / 180));\n}\n\n//# sourceURL=webpack://Starback/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});