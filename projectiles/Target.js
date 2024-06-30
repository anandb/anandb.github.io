function Target() 
{
  this.size = 60;
  this.empty = true;
  this.position = createVector(width - 10, random(height/2, height - height/4));
  
  // Flash green on collision
  this.render = function() {
    fill("#2e4a77");
    
    if (!this.empty) {
      fill("#50c645");
      this.empty = true;
    }
    
    rect(this.position.x, this.position.y, this.size, this.size, 5);
  }
  
  this.paintCollision = function(ball) {
    if (this.checkCollision(ball))
      this.empty = false;
  }
  
  // Consider the whole rect rather than just the center.
  this.checkCollision = function(ball) {
    return (ball.position.x > this.position.x && 
            ball.position.x < this.position.x + this.size && 
            ball.position.y > this.position.y && 
            ball.position.y < this.position.y + this.size);
  }
}