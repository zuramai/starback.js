const canvas = document.getElementById('canvas')
const starback = new Starback(canvas,{
    width: canvas.parentElement.clientWidth,
    height: canvas.parentElement.clientHeight,
    speed: 5,
    frequency: 5,
    slope: {x: 5, y:3},
    directionX: 1,
    spread: .2,
    randomOpacity: true,
    backgroundColor: ["#0F2027", "#203A43", "#2C5364"]
})

starback.generateStar(20)
let mountain = new Image()
mountain.src = "images/mountain2.png"
console.log(mountain.height)

mountain.onload = () => {
    starback.addToFront(ctx => {
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
console.log(starback.frontCallbacks)
console.log(starback.stars)