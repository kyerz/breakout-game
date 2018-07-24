const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


let x = canvas.width/2
let y = canvas.height - 30
const ballRadius = 10
let dx = 2
let dy = -2
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width-paddleWidth) / 2
let paddleY = canvas.height
let leftPressed = false
let rightPressed = false
let brickRowCount = 6
let brickColumnCount = 10
const brickWidth = 75
const brickHeight = 20
const brickPadding = 20
const brickOffsetTop = 20
const brickOffsetLeft = 45

const bricks = []
for(let i=0; i < brickColumnCount; i++) {
  bricks[i] = []
  for(let y=0; y < brickRowCount; y++) {
    bricks[i][y] = {x: 0, y: 0, status: 1}
  }
}


const drawBricks = () => {
  for(let i=0; i < brickColumnCount; i++) {
    for(let y=0; y < brickRowCount; y++) {
      if(bricks[i][y].status === 1) {
        const brickX = (i*(brickWidth + brickPadding)) + brickOffsetLeft
        const brickY = (y*(brickHeight + brickPadding)) + brickOffsetTop
        bricks[i][y].x = brickX
        bricks[i][y].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#00FF0C'
        ctx.fill()
        ctx.closePath()

      }

    }
  }
}

const collisionDetection = () => {
	for(let i=0; i < brickColumnCount; i++) {
		for(r=0;r<brickRowCount;r++){
			const b = bricks[i][r];
			if(b.status == 1){
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
				
				}
			}
		}
	}
}

const keyDownHandler = (event) => {
  if(event.keyCode == 39) {
    rightPressed = true
  }
  else if(event.keyCode == 37) {
    leftPressed = true
  }
}

const keyUpHandler = (event) => {
  if(event.keyCode == 39) {
    rightPressed = false
  }
  else if(event.keyCode == 37) {
    leftPressed = false
  }
}


document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)


const drawBall = () => {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle='#00FF0C';
  ctx.fill()
  ctx.closePath()
}

const drawPaddle = () => {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle='#00FF0C';
  ctx.fill()
  ctx.closePath()
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawPaddle()
  collisionDetection()
  
  if(y < ballRadius) {
    dy = -dy
  }
  else if( y  > canvas.height - ballRadius - paddleHeight/2) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    }
    else {
      alert('GAME OVER')
      document.location.reload()
    }
  }

  if(x - ballRadius < 0 || x + ballRadius > canvas.width) {
    dx = -dx
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7
  }

  else if(leftPressed && paddleX > 0) {
    paddleX -= 7
  }

  x += dx
  y += dy
}

setInterval(draw, 10)