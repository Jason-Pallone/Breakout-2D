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