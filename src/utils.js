/**
 * Get random number between two given number.
 * @param {Number} min Minimum Number
 * @param {Number} max Maximum Number
 * @returns {Number} The random number result
*/
export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min
}

export function randomArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Convert angle degree to sin degree
 * @param {*} angleDeg 
 */
export function sinDeg(angleDeg) {
    return Math.sin(angleDeg * (Math.PI / 180))
}

/**
 * Convert angle degree to cos degree
 * @param {*} angleDeg 
 */
export function cosDeg(angleDeg) {
    return Math.cos(angleDeg * (Math.PI / 180))
}