//
//  Big Scary Shark
//
function Shark() {
  this.pos = createVector(random(0, width), random(0, height));
}

Shark.prototype.move = function(x, y) {
  this.pos.set(x, y);
}

Shark.prototype.display = function() {
  push();
  translate(this.pos.x, this.pos.y);
  noStroke();
  fill(0, 0, 0);
  beginShape();
  vertex(25, -30);
  vertex(15, 0);
  vertex(0, 0);
  endShape();
  pop();
}