
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
