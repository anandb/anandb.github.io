function Planet(mass, x, y) {

  // Planetary Mass
  this.G = 1;
  this.mass = mass;

  // Pick something yellowish
  this.color = color(random(238, 244), random(80, 244), random(65, 66));

  // Movement Vectors
  this.pos = createVector(x, y);
  this.vel = createVector(1, 0);
  this.accel = createVector(0, 0);

  this.calculateAttraction = function(planet) {

    // Get the direction of the force, towards the center of other planet
    var force = p5.Vector.sub(planet.pos, this.pos);
    var distance = force.mag();
    distance = constrain(distance, 5, 15);

    // Compute and set gravitational attraction
    force.setMag(this.G * this.mass * planet.mass / (distance * distance) );

    return force;
  }

  this.applyForce = function(force) {
    var accel = p5.Vector.div(force, this.mass);
    this.accel.add(accel);
  }

  this.update = function() {
    // Have a minimum velocity to keep the simulation going
    this.vel.add(this.accel);
    this.vel.setMag(this.vel.mag() < 5 ? 5 : this.vel.mag());
    this.pos.add(this.vel);
    this.accel.mult(0);
  }

  this.display = function() {
    ellipseMode(CENTER);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.mass);
  }
}
