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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StarbackDefaultConfig\": () => (/* binding */ StarbackDefaultConfig),\n/* harmony export */   \"default\": () => (/* binding */ Starback)\n/* harmony export */ });\n/**\n * Default Config\n * @type {Object}\n */\nconst StarbackDefaultConfig = {\n  width: 800,\n  height: 600,\n  speed: 0.5,\n  starColor: ['#fb00ff', '#00dde0'],\n  maxStar: 200,\n  starSize: 100,\n  directionY: 1,\n  // 1 = top-to-bottom, 2 = bottom-to-top\n  directionX: 1,\n  // 1 = left-to-right, 2 = right-to-left\n  distanceX: 0.1,\n  // distance of the current start X\n  slope: {\n    x: 1,\n    y: 1\n  },\n  frequency: 10,\n  spread: 1,\n  randomOpacity: false,\n  backgroundColor: '#ccc',\n  showFps: false\n};\n/**\n * Starback\n * @class Starback\n */\n\nclass Starback {\n  static DefaultConfig = StarbackDefaultConfig;\n  /**\n   * Starback library\n   * @param {HTMLElement|string} Canvas element or the selector\n   * @param {Object} options\n   */\n\n  constructor(canvas, config = {}) {\n    this.canvas = canvas instanceof HTMLElement ? canvas : document.querySelector(canvas);\n    /** @type {CanvasRenderingContext2D} */\n\n    this.ctx = this.canvas.getContext('2d'); // merge config\n\n    this.mergeConfig(config); //\n\n    this.repeat = 0;\n    this.stars = []; // storing callbacks\n\n    this.frontCallbacks = [];\n    this.behindCallbacks = []; // for calculating fps\n\n    this.fps = 0;\n    this.lastCalledTime = 0; // time tracking\n\n    this.lastGenerated = 0;\n    this.init();\n  }\n\n  init() {\n    this.canvas.setAttribute('width', this.width);\n    this.canvas.setAttribute('height', this.height);\n    requestAnimationFrame(t => this.render(t));\n    console.log(this.width, this.height);\n  }\n\n  update() {\n    this.stars.map((star, index) => {\n      star.progress += star.speed; // if(star.y - star.height > this.canvas.height) return stars.splice(index,1)\n    });\n  }\n  /**\n   * Merge Config\n   * @param  {StarbackDefaultConfig|object} instanceConfig\n   */\n\n\n  mergeConfig(instanceConfig) {\n    // merge config\n    const config = Object.assign(StarbackDefaultConfig, instanceConfig); // apply config\n\n    this.width = config.width;\n    this.height = config.height;\n    this.speed = config.speed;\n    this.directionY = config.directionY * -1;\n    this.directionX = config.directionX;\n    this.starColor = config.starColor;\n    this.maxStar = config.maxStar;\n    this.slope = config.slope;\n    this.starSize = config.starSize;\n    this.showFps = config.showFps;\n    this.backgroundColor = config.backgroundColor;\n    this.distanceX = config.distanceX;\n    this.frequency = config.frequency;\n    this.randomOpacity = config.randomOpacity;\n    this.spread = config.spread;\n  }\n\n  setBackground() {\n    let bg;\n    if (typeof this.backgroundColor == 'string') bg = this.backgroundColor;else if (typeof this.backgroundColor == 'object') {\n      bg = this.ctx.createLinearGradient(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);\n      this.backgroundColor.forEach((bgString, index) => {\n        bg.addColorStop(index / this.backgroundColor.length, bgString);\n      });\n    }\n    this.ctx.fillStyle = bg;\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n  }\n  /**\n   * Get random number between two given number.\n   * @param {Number} min Minimum Number\n   * @param {Number} max Maximum Number\n   * @returns {Number} The random number result\n   */\n\n\n  randomNumber(min, max) {\n    return Math.floor(Math.random() * (max - min) + 1) + min;\n  }\n\n  draw() {\n    this.ctx.strokeStyle = 'white';\n    this.stars.forEach(star => {\n      // Add to front of stars with callback\n      this.behindCallbacks.forEach(cb => cb(ctx)); // draw the stars\n\n      let starColor;\n\n      if (typeof this.starColor == 'object') {\n        starColor = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);\n        this.starColor.forEach((color, index) => starColor.addColorStop(index / this.starColor.length, color));\n      } else starColor = this.starColor; // pathway with berzier curve\n\n\n      this.ctx.save();\n      this.ctx.strokeStyle = starColor;\n      this.ctx.beginPath();\n      this.ctx.moveTo(star.start.x, star.start.y);\n      this.ctx.setLineDash([this.starSize, star.startPoint * this.frequency]);\n      this.ctx.lineDashOffset = this.directionY * (star.progress + star.length);\n      this.ctx.quadraticCurveTo(star.curve.x, star.curve.y, star.end.x, star.end.y);\n      this.ctx.stroke();\n      this.ctx.closePath();\n      this.ctx.restore(); // Add to front of stars with callback\n\n      this.frontCallbacks.forEach(cb => cb(this.ctx)); // Draw FPS (development only)\n\n      if (this.showFps) this.drawFps(); // bezier curve point\n      // this.ctx.beginPath()\n      // this.ctx.fillStyle=\"blue\"\n      // this.ctx.arc(star.curve.x, star.curve.y, 20, 0, Math.PI*2)\n      // this.ctx.fill()\n      // this.ctx.closePath()\n    });\n  }\n\n  generateRandomStar() {\n    const x = this.randomNumber(-20, this.canvas.width);\n    const y = x <= 0 ? this.randomNumber(0, this.canvas.height) : 0;\n    const height = this.starSize;\n    const endX = x + (this.canvas.width * this.distanceX + this.spread * x * this.directionX);\n    const adjacentWidth = endX - x;\n    const length = this.canvas.height;\n    this.stars.push({\n      x,\n      y,\n      length,\n      height,\n      progress: 0,\n      speed: this.speed + Math.random() / 5,\n      lineDash: this.randomNumber(50, 100),\n      filter: {\n        opacity: this.randomArr([this.randomNumber(20, 100) + '%', false])\n      },\n      start: {\n        x,\n        y\n      },\n      curve: {\n        x: x + adjacentWidth * this.slope.x,\n        y: y + this.canvas.height * this.slope.y\n      },\n      startPoint: this.randomNumber(10, 100),\n      end: {\n        x: endX,\n        y: this.canvas.height\n      }\n    });\n    return this.stars;\n  }\n\n  addToFront(cb) {\n    this.frontCallbacks.push(cb);\n  }\n\n  addToBehind(cb) {\n    this.behindCallbacks.push(cb);\n  }\n\n  generateStar(amount) {\n    for (let i = 0; i < amount; i++) {\n      this.generateRandomStar();\n    }\n  }\n\n  drawFps() {\n    this.ctx.fillStyle = 'white';\n    this.ctx.fillText(`${this.fps} fps`, 10, 10);\n  }\n\n  render(timestamp) {\n    if (!this.lastCalledTime) this.lastCalledTime = timestamp;\n    let deltaTime = timestamp - this.lastCalledTime;\n    this.fps = Math.round(1000 / deltaTime);\n    this.lastCalledTime = timestamp;\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.setBackground();\n    this.draw();\n    this.update();\n    requestAnimationFrame(t => this.render(t));\n  }\n\n  randomArr(arr) {\n    return arr[Math.floor(Math.random() * arr.length)];\n  }\n\n}\n\n//# sourceURL=webpack://Starback/./src/starback.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});