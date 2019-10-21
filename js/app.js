const btn = document.querySelector("button");
const canvas =  document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;


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


