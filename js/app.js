const btn = document.querySelector("button");
const canvas =  document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
const paddleHeight = 10;
const paddleWidth = 75;
/* the paddles x coordinate */
let paddleX = (canvas.width - paddleWidth) / 2;
/* the ball radius & its x and y coordinates , dx and dy are used for ball movement and detection */
const ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
/* bricks for the game */
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
/* score and lives for the game */
let score = 0;
let lives = 3;

/* this section creates the bricks for the game */
const bricks = [];

for(let c=0; c<brickColumnCount; c+=1){
  bricks[c] = [];
  for(let r=0; r<brickRowCount; r+=1){
    bricks[c][r] = {x: 0, y: 0, status: 1 };
  }
}

function drawBricks(){
  for(let c=0; c<brickColumnCount; c+=1){
    for(let r=0; r<brickRowCount; r+=1){
      if(bricks[c][r].status == 1){
      let brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
      let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = 'aqua';
      ctx.fill();
      ctx.closePath()
      }
    }
  }
}

/* Event Listeners and functions for paddle movement. */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keypUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = true;
  }

  if(e.key == "Left" || e.key =="ArrowLeft"){
    leftPressed = true;
  }
};

function keypUpHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
      rightPressed = false;
  }

  if(e.key == "Left" || e.key == "ArrowLeft"){
      leftPressed = false;
  }
};

/* checking brick collision with the ball */
function collisionDetection(){
  for(let c=0; c<brickColumnCount; c+=1){
    for(let r=0; r<brickRowCount; r+=1){
      let b = bricks[c][r];
      if(b.status == 1)
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight ){
          dy = -dy;
          b.status = 0;
          score += 1;
          if(score == brickRowCount * brickColumnCount){
            alert(`YOU WIN, CONGRATULATIONS! Your total score was ${score}!`);
            document.location.reload();
        }
      }
    }
  }
}

/* keeps track of score and lives for the game */
function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}

/* create the paddle and ball */
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle ="#0095DD";
  ctx.fill();
  ctx.closePath();
};

/* function for ball and paddle movement */
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  /* checks the ball x and y coordinates to see if its hitting the top/bottom or sides of the canvas */
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }  /* checks to see if the ball is at the bottom of the canvas and if it hit the paddle,
   if it did not hit the paddle, the ball & paddle reset and the player loses 1 life */
  else if(y + dy > canvas.height-ballRadius){
      if(x > paddleX && x < paddleX+paddleWidth){
          dy = -dy;
      }
      else {
        lives -= 1;
        if(!lives){
          alert("GAME OVER");
          document.location.reload();
        }
        else {
         x = canvas.width / 2;
         y = canvas.height - 30;
         dx = 3;
         dy = -3;
         paddleX = (canvas.width-paddleWidth) / 2;
       }
      }
  };
/* paddle movement and checks to see if paddle is going outside canvas width */
  if(rightPressed){
    paddleX += 3;
    if(paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
  }
}
  else if(leftPressed){
    paddleX -= 3;
    if(paddleX < 0){
      paddleX = 0;
  }
}
  x += dx;
  y += dy;

  requestAnimationFrame(draw);
};

btn.addEventListener('click', (e)=>{
  e.target.remove()
  draw()
});


