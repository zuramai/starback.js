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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StarbackDefaultConfig\": () => (/* binding */ StarbackDefaultConfig),\n/* harmony export */   \"default\": () => (/* binding */ Starback)\n/* harmony export */ });\n/* harmony import */ var _types_dot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/dot */ \"./src/types/dot.js\");\n\n\n/**\r\n * Default Config\r\n * @type {Object}\r\n */\n\nconst StarbackDefaultConfig = {\n  width: 800,\n  height: 600,\n  speed: [0.1, .8],\n  starColor: ['#fb00ff', '#00dde0'],\n  quantity: 100,\n  starSize: [0, 3],\n  directionY: 1,\n  // 1 = top-to-bottom, 2 = bottom-to-top\n  directionX: 1,\n  // 1 = left-to-right, 2 = right-to-left\n  distanceX: 0.1,\n  // distance of the current start X\n  slope: {\n    x: 1,\n    y: 1\n  },\n  frequency: 10,\n  spread: 1,\n  randomOpacity: true,\n  backgroundColor: '#ccc',\n  showFps: false,\n  type: 'dot'\n};\n/**\r\n * Starback class wrapper\r\n * @class Starback\r\n */\n\nclass Starback {\n  static DefaultConfig = StarbackDefaultConfig;\n  config = {};\n  /**\r\n   * Stores stars' class\r\n   * @type {Dot|Line}\r\n   */\n\n  stars = null;\n  starTypes = {\n    'dot': _types_dot__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    'line': _types_dot__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  };\n  /**\r\n   * Starback library\r\n   * @param {HTMLElement|string} Canvas element or the selector\r\n   * @param {Object} options\r\n   */\n\n  constructor(canvas, config = {}) {\n    this.canvas = canvas instanceof HTMLElement ? canvas : document.querySelector(canvas);\n    /** @type {CanvasRenderingContext2D} */\n\n    this.ctx = this.canvas.getContext('2d'); // merge config\n\n    this.mergeConfig(config); //\n\n    this.repeat = 0; // storing callbacks\n\n    this.frontCallbacks = [];\n    this.behindCallbacks = []; // for calculating fps\n\n    this.fps = 0;\n    this.lastCalledTime = 0; // time tracking\n\n    this.lastGenerated = 0;\n    this.init();\n  }\n  /**\r\n   * Merge Config\r\n   * @param  {StarbackDefaultConfig|object} instanceConfig\r\n   */\n\n\n  mergeConfig(instanceConfig) {\n    // merge config\n    const config = Object.assign(StarbackDefaultConfig, instanceConfig); // apply config\n\n    this.config = config; // this.width = config.width\n    // this.height = config.height\n    // this.speed = config.speed\n    // this.direction = config.direction\n    // // this.directionY = config.directionY\n    // // this.directionX = config.directionX\n    // this.starColor = config.starColor\n    // this.maxStar = config.maxStar\n    // this.slope = config.slope\n    // this.starSize = config.starSize\n    // this.showFps = config.showFps\n    // this.config.backgroundColor = config.backgroundColor\n    // this.distanceX = config.distanceX\n    // this.frequency = config.frequency\n    // this.randomOpacity = config.randomOpacity\n    // this.spread = config.spread\n    // this.type = config.type\n  }\n  /**\r\n   * Initialize canvas before render\r\n   */\n\n\n  init() {\n    this.canvas.setAttribute('width', this.config.width);\n    this.canvas.setAttribute('height', this.config.height);\n    this.stars = new this.starTypes[this.config.type](canvas, this.config);\n    requestAnimationFrame(t => this.render(t));\n  }\n  /**\r\n   * Set background for the whole canvas\r\n   */\n\n\n  setBackground() {\n    let bg;\n    if (typeof this.config.backgroundColor == 'string') bg = this.config.backgroundColor;else if (typeof this.config.backgroundColor == 'object') {\n      bg = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);\n      this.config.backgroundColor.forEach((bgString, index) => {\n        bg.addColorStop(index / this.config.backgroundColor.length, bgString);\n      });\n    }\n    this.ctx.fillStyle = bg;\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n  }\n  /**\r\n   * Draw the frame into the canvas\r\n   */\n\n\n  draw() {\n    this.stars.draw();\n  }\n  /**\r\n   * Update everything in the canvas frame including stars\r\n   */\n\n\n  update() {\n    this.stars.update();\n  }\n  /**\r\n   * Add an object in front of the stars\r\n   * @param {Function} cb Callback function\r\n   */\n\n\n  addToFront(cb) {\n    this.frontCallbacks.push(cb);\n  }\n  /**\r\n   * Add an object behind the stars\r\n   * @param {Function} cb Callback function\r\n   */\n\n\n  addToBehind(cb) {\n    this.behindCallbacks.push(cb);\n  }\n  /**\r\n   * The total quantity of stars in canvas\r\n   * @param {Number} amount The number of stars\r\n   */\n\n\n  generateStar() {\n    this.stars.generate(this.config.quantity);\n  }\n  /**\r\n   * Draw the FPS in the canvas.\r\n   */\n\n\n  drawFps() {\n    this.ctx.fillStyle = 'white';\n    this.ctx.fillText(`${this.fps} fps`, 10, 10);\n  }\n  /**\r\n   * Canvas render function\r\n   * @param {DOMHighResTimeStamp} timestamp \r\n   */\n\n\n  render(timestamp) {\n    if (!this.lastCalledTime) this.lastCalledTime = timestamp;\n    let deltaTime = timestamp - this.lastCalledTime;\n    this.fps = Math.round(1000 / deltaTime);\n    this.lastCalledTime = timestamp;\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.setBackground();\n    this.draw();\n    this.update();\n    requestAnimationFrame(t => this.render(t));\n  }\n\n}\n\n//# sourceURL=webpack://Starback/./src/starback.js?");

/***/ }),

/***/ "./src/types/dot.js":
/*!**************************!*\
  !*** ./src/types/dot.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils */ \"./src/utils.js\");\n\n\n\nclass Dot {\n  /**\r\n   * Collection of stars\r\n   * @param\r\n   */\n  stars = [];\n  config = null;\n  direction = 45;\n  overflowSize = 10;\n  /** @type {HTMLCanvasElement} */\n\n  canvas = null;\n  /** @type {CanvasRenderingContext2D} */\n\n  ctx = null;\n\n  constructor(canvas, config) {\n    this.config = config;\n    this.canvas = canvas;\n    this.ctx = canvas.getContext('2d');\n  }\n\n  draw() {\n    for (let i = 0; i < this.stars.length; i++) {\n      let star = this.stars[i];\n      this.ctx.beginPath();\n      this.ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;\n      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);\n      this.ctx.fill();\n      this.ctx.closePath();\n    }\n  }\n\n  update() {\n    let dx = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.sinDeg)(this.direction);\n    let dy = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.cosDeg)(this.direction);\n\n    for (let i = 0; i < this.config.quantity; i++) {\n      let star = this.stars[i]; // console.log(star.speed)\n\n      star.x += dx * .5;\n      star.y += dy * .5; // When the star location is outside the canvas, delete it and generate a new one\n\n      if (star.x > this.canvas.width + this.overflowSize || star.x < 0 - this.overflowSize || star.y > this.canvas.height + this.overflowSize || star.y < 0 - this.overflowSize) {\n        this.stars.splice(i, 1);\n        let x, y; // If the direction is right-down\n\n        if (dx > 0 && dy > 0) {\n          x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomArr)([-this.overflowSize, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(-this.overflowSize, this.canvas.width - this.overflowSize)]);\n          y = x == -this.overflowSize ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(-this.overflowSize, this.canvas.height - this.overflowSize) : -this.overflowSize;\n        }\n\n        let newStarLocation = {\n          x,\n          y\n        };\n        this.generate(1, newStarLocation);\n      }\n    }\n  }\n\n  generate(amount, location = null) {\n    // Generate star in specific location\n    if (location) {\n      let {\n        x,\n        y\n      } = location;\n      return this.stars.push({\n        x,\n        y,\n        size: this.randomSize(),\n        opacity: this.randomOpacity()\n      });\n    } // If no location provided, it will generate stars in random locations.\n\n\n    for (let i = 0; i < amount; i++) {\n      let x = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(0, this.canvas.width);\n      let y = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(0, this.canvas.height);\n      let speed = typeof this.config.speed == 'object' ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(this.config.speed[0], this.config.speed[1]) : this.config.speed;\n      this.stars.push({\n        x,\n        y,\n        size: this.randomSize(),\n        opacity: this.randomOpacity(),\n        speed\n      });\n    }\n\n    console.log(this.stars);\n    console.log('generate dot', amount);\n  }\n\n  randomSize() {\n    return typeof this.config.starSize == 'object' ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomNumber)(this.config.starSize[0], this.config.starSize[1]) : this.config.starSize;\n  }\n\n  randomOpacity() {\n    return this.config.randomOpacity ? Math.random() : 1;\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dot);\n\n//# sourceURL=webpack://Starback/./src/types/dot.js?");

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