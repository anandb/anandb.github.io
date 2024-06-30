function Boid() {

  // Movement Vectors
  this.pos = createVector(random(0, width), random(20, height));
  this.vel = createVector(random(1, 2), 0);
  this.acc = createVector(0, 0);

  // Speed Limit
  this.maxSpeed = 2;

  // Steering Limit
  this.maxSteering = 0.5;

  // Fish color (Gold/Orange)
  this.color = color(random(238, 244), random(80, 244), random(65, 66));
}

Boid.prototype.behaviors = function(school, shark) {
  this.separate(school);
  this.alignment(school);
  this.cohesion(school);

  this.flee(shark);
}

Boid.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Boid.prototype.cohesion = function(school) {

  var neighborDistance = 50;
  var centroid = createVector(0, 0);
  var count = 0;

  // Compute the centroid of the swarm
  for (var neighbor = 0; neighbor < school.length; neighbor++) {
    var distance = this.pos.dist(school[neighbor].pos);
    if (distance > 0 && distance < neighborDistance) {
      centroid.add(school[neighbor].pos);
    }
  }

  // Seek to the centroid to keep the swarm together
  if (count > 0) {
    centroid.div(count);
    this.seek(centroid);
  }
}

Boid.prototype.seek = function(target) {
  // Get vector pointing towards target
  var towards = p5.Vector.sub(target, this.pos);
  towards.normalize();
  towards.mult(this.maxSpeed);

  // Calculate Reynolds ( Steering = desired - velocity )
  var steering = p5.Vector.sub(towards, this.vel);
  steering.limit(this.maxSteering);
  this.applyForce(steering);
}

Boid.prototype.alignment = function(school) {
  var neighborDistance = 70;
  var desired = createVector(0, 0);

  for (var neighbor = 0; neighbor < school.length; neighbor++) {

    var distance = this.pos.dist(school[neighbor].pos);

    // If within impact radius
    if (distance > 0 && distance < neighborDistance) {
      desired.add(school[neighbor].vel);
    }
  }

  // Get swarm velocity
  desired.normalize();
  desired.mult(this.maxSpeed);

  // Calculate Steering Force and Apply
  var steering = p5.Vector.sub(desired, this.velocity);
  steering.limit(this.maxSteering);
  this.applyForce(steering);
}

Boid.prototype.flee = function(shark) {

  // Get vector pointing away from target
  var desired = p5.Vector.sub(this.pos, shark.pos);
  var distance = desired.mag();

  if (distance < 70) {

    // Normalize desired and scale speed, faster if closer to target
    desired.normalize();
    desired.mult(map(distance, 70, 0, 0, this.maxSpeed));

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
}

Boid.prototype.separate = function(school) {

  var neighborDistance = 20;
  var relevantCount = 0;
  var desired = createVector(0, 0);

  for (var neighbor = 0; neighbor < school.length; neighbor++) {

    // Vector pointing away from neighbor
    var away = p5.Vector.sub(this.pos, school[neighbor].pos);
    var distance = away.mag();

    // Assign a weightage by distance
    if (distance > 0 && distance < neighborDistance) {
      away.normalize();
      away.div(distance);
      desired.add(away);
      relevantCount++;
    }
  }

  // Move away from neighbors with max speed
  if (relevantCount > 0) {
    desired.div(relevantCount);
    desired.mult(this.maxSpeed);
    var steering = p5.Vector.sub(desired, this.velocity);
    steering.limit(this.maxSteering);
    this.applyForce(steering);
  }
}

Boid.prototype.borders = function() {
  // Wrap around
  if (this.pos.x < 0) this.pos.x = width;
  if (this.pos.x > width) this.pos.x = 0;
  if (this.pos.y < 0) this.pos.y = height;
  if (this.pos.y > height) this.pos.y = 0;
}

Boid.prototype.update = function() {

  // Update movement vectors
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed)
  this.pos.add(this.vel);
  this.acc.mult(0);

  this.borders();
}

Boid.prototype.display = function() {
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading())
  noStroke();
  fill(this.color);
  beginShape();
  vertex(-5, -5);
  vertex(-5, 5);
  vertex(3, 0);
  endShape();
  ellipse(5, 0, 15, 10);
  pop();
}

