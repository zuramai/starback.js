![starbackjs](https://user-images.githubusercontent.com/45036724/130007266-83c720b8-ce3f-47e8-a854-ac0b640ce36f.gif)

# Getting Started
You can use starback.js directly with `<script>` tag or import either.
- With <script> tag
  ```html
  <script src="PATH_TO_DIST_FOLDER/starback.js"></script>
  ```
- With import
  ```js
  import Starback from 'starback'
  ```
  
# Example Usage 
```html
<canvas id="canvas"></canvas>

<script src="PATH_TO_DIST_FOLDER/starback.js"></script>
<script>
  const canvas = document.getElementById('canvas')
  const starback = new Starback(canvas, {
    width: 1000, 
    height: 500, 
    speed: 5,
    spread: 0.2,
    // ...and the other options
  })
</script>
```
You can check the more options in [Options section](#options)
  
# Options
  | Key         | Type | Description | Required | Default Value |
  | ----------- | ---- | ----------- | -------- | ------------- |
  | width | Number | Canvas width to set | no | default canvas size |
  | height | Number | Canvas height to set | no | default canvas size |
  | backgroundColor | String&#124;Array | Color of the background, use string for solid color, or array of colors for linear gradient | no | #ccc |
  | directionY | Number | | no | 1 |
  | directionX | Number | | no | 1 |
  | distanceX | Number | | no | 0.1 |
  | frequency | Number | | no | 10 |
  | randomOpacity | Boolean | | no | false |
  | slope | Object | | no | {x: 1, y: 1} |
  | starColor | String&#124;Array | Color of the stars, use string for solid color, or array of colors for linear gradient | no | hsla(299, 100%, 50%, 1) |
  | speed | Number | | no | 0.5 |
  | spread | Number | | no | 1 |
  | starSize | Number | | no | 100 |
  | showFps | Boolean | | no | false |
  
# Contributing
  You can contribute to this repository. See [CONTRIBUTING.md](https://github.com/zuramai/starback.js/blob/main/CONTRIBUTING.md)

# Donate
  If you have used this library and it's useful for you, please consider to donate:
  
  [Ko-fi](https://ko-fi.com/saugi) | [Trakteer](https://trakteer.id/saugi)

# License
  This library is under MIT license.
