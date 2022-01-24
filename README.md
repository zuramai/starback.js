![Starbackjs](https://user-images.githubusercontent.com/45036724/144230732-9104dc0e-c4fe-4c5c-9990-6693f4c0400c.gif)
![Starbackjs Demo Night](https://user-images.githubusercontent.com/45036724/144230828-076a39ae-cc2a-4096-803d-a9bbb49b1d58.gif)

Click for [more examples](https://zuramai.github.io/starback.js/)

# Starback.js

## Getting Started
You can use starback.js directly with `<script>` tag or import syntax.
- With `<script>` tag

  ```html
  # Using CDN
  <script src="https://unpkg.com/starback@2.0.1/dist/starback.js"></script>

  # Using downloaded files
  <script src="PATH_TO_YOUR_DIST_FOLDER/starback.js"></script>
  ```

- With import

  Install via NPM first:

  ```bash
  npm install starback
  ```

  and then

  ```js
  import Starback from 'starback'
  ```

## Example Usage

```html
<canvas id="canvas"></canvas>

<script src="PATH_TO_DIST_FOLDER/starback.js"></script>
<script>
  const canvas = document.getElementById('canvas')
  const starback = new Starback(canvas, {
      type: 'dot',
      quantity: 100,
      direction: 225,
      backgroundColor: ['#0e1118', '#232b3e'],
      randomOpacity: true,
  })
</script>
```

You can check the more options in [Options section](#options)

## Options


| Key  | Type   | Description          | Required | Default Value|
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| type | String | **Required.** Star type to use. The values are 'dot' or 'line' | true |    |
| width| Number | Canvas width to set  | no | 800    |
| height    | Number | Canvas height to set | no | 600    |
| backgroundColor | String&#124;Array | Color of the background, use string for solid color, or array of colors for linear gradient | no | #ccc   |
| quantity        | Number | Number of stars to show | no | 100        |
| showFps         | Boolean | Show FPS on the top left screen | no       | false        |
| speed | Number | Star speed | no       | 0.5          |
| starSize        | Number&#124;Array | Use number for fixed star size. Use [minSize, maxSize] value for random the size within the range | no       | [0, 3] for `type: dot`, 100 for `type: line`          |

## Additional options for `type: 'dot'`
| Key  | Type   | Description          | Required | Default Value |
| ---- | ------ | -------------------- | -------- | ------------- |
| direction   | Number | Use 360 degree to set the direction | no | 225  |
| randomOpacity   | Boolean&#124;Array | If `true`, random star will get random opacity. Use array [minOpacity, maxOpacity] to limit the random opacity  | no | false  |
| starColor       | String | Color of the stars, you can use `rgb` or `hex` like css color. | no       | white |

## Additional options for `type: 'line'`
| Key  | Type   | Description          | Required | Default Value |
| ---- | ------ | -------------------- | -------- | ------------- |
| directionY      | Number | The direction the star to move vertically (1 = to bottom, 0 = to top)       | no       | 1 |
| directionX      | Number | The direction the star to move vertically (1 = to right, 0 = to left)       | no       | 1 |
| distanceX       | Number | Distance horizontally the star should reaching at     | no       | 0.1          |
| frequency       | Number | The frequency of star will be rotated      | no       | 10|
| slope | Object | The quadraticCurve coordinate that will be applied to stars. Read [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo) | no       | {x: 1, y: 1} |
| starColor       | String&#124;Array | Color of the stars, use string for solid color, or array of colors for linear gradient | no       | ['#fb00ff', '#00dde0'] |
| spread          | Number | The spread level of the stars   | no       | 1 |


## Methods

| Name   | Parameter         | Description      |
| ---------------------------- | --------------------------------------- | ------------------------------------------------- |
| `generateStar(amount)`       | amount | The quantity of stars that will be shown          |
| `addToFront(callback(ctx))`  | function(ctx: CanvasRenderingContext2D) | Add to front of the falling star by given context |
| `addToBehind(callback(ctx))` | function(ctx: CanvasRenderingContext2D) | Add to back of the falling star by given context  |

Example method usage: adding image to front

```js
let starback = new Starback(canvas, options)

let mountainImage = new Image()
mountainImage.src = 'images/mountain.png'

mountainImage.onload = () => {
  starback.addToFront((ctx) => {
    ctx.drawImage(
      mountain,
      0,
      0,
      mountain.width,
      mountain.height,
      0,
      canvas.height - mountain.height,
      canvas.width,
      mountain.height
    )
  })
}
```

## Contributing

You can contribute to this repository. See [CONTRIBUTING.md](https://github.com/zuramai/starback.js/blob/main/CONTRIBUTING.md)

## Donate

If you have used this library and it's useful for you, please consider to donate:

[Ko-fi](https://ko-fi.com/saugi) | [Trakteer](https://trakteer.id/saugi)

## License

This library is under MIT license.
