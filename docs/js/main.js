const canvas = document.getElementById('canvas')

const starback = new Starback(canvas, {
  width: canvas.parentElement.clientWidth,
  height: canvas.parentElement.clientHeight,
  type: 'dot',
  quantity: 100,
  direction: 180,
  backgroundColor: ['#0e1118', '#232b3e'],
})

let mountain = new Image()
mountain.src = 'images/mountain2.png'

mountain.onload = () => {
  starback.addToBehind((ctx) => {
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
