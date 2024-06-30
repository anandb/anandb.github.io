//
//  DNA has angle, mass, diameter and magnitude.
//
function Ball(dna)
{
  // The usual displacement vectors
  this.position = createVector(0, height);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  
  // Ball is alive during flight
  this.alive = false;
  
  // Drag force is affected by diameter of the ball.
  this.dragCoefficient = 0.00001;
  this.distanceFromTarget = Number.MAX_VALUE;
  
  this.dna = new DNA();
  
  if (arguments.length > 0) {
    this.dna = dna;    
  }
  
  this.isAlive = function() {
    return this.alive;
  }
  
  this.launch = function() {
    this.alive = true;
    
    // Decode DNA
    this.diameter = map(this.dna.genes[0], 0, 1, 10, 30);
    this.theta = map(this.dna.genes[1], 0, 1, -PI/10, -PI/2);
    this.launchMagnitude = map(this.dna.genes[2], 0, 1, 6, 12);
    this.mass = map(this.dna.genes[3], 0, 1, 1, 2);
    
    // Launch!
    var launchForce = p5.Vector.fromAngle(this.theta);    
    launchForce.setMag(this.launchMagnitude);
    this.applyForce(launchForce);
  }
  
  this.calcFitness = function() {
    // Just the distance from the target, disregard flight time.
    if (this.distanceFromTarget < 1)
      this.distanceFromTarget = 1;
      
    return 1/this.distanceFromTarget;
  }
  
  this.applyForce = function(f) {
    var effectiveForce = f.copy();
    effectiveForce.div(this.mass);
    
    this.acceleration.add(f);        
  }
  
  this.applyGravity = function() {
    var gravity = createVector(0, 0.08);
    gravity.mult(this.mass);
    this.applyForce(gravity);    
  }
  
  this.handleWind = function(windField) {
    // A strong wind causes the diameter 
    // to shrink to reduce drag.
    var wind = windField.lookup(this.position);
    this.applyForce(wind);
    
    // Drag is in the opposite direction to velocity
    var drag = this.velocity.copy().normalize().mult(-1);
    drag.setMag(this.velocity.mag() * this.velocity.mag() * this.diameter * this.dragCoefficient);
    this.applyForce(drag);
  }
  
  this.checkTarget = function(target) {
    if (this.alive) {
      
      // If the ball hits the target, make distance = 0
      if (target.checkCollision(this)) {
        this.alive = false;
        this.distanceFromTarget = 0;
      }
      else if(this.position.x > width || this.position.y > height) {
        // Else compute a euclidean distance
        this.alive = false;
        this.distanceFromTarget = this.position.dist(target.position);
      }
    }
  }
  
  this.update = function() {
    this.velocity.add(this.acceleration);    
    this.position.add(this.velocity);    
    this.acceleration.mult(0);
  }
  
  this.display = function() {
    if (this.alive) {
      fill(random(0, 50));
      noStroke();
      ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
    }
  }
}