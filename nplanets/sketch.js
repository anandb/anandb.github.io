//
// Multiple planets with varied mass revolving around each other
//
var planets = [];

function setup()
{
  createCanvas(320, 480);

  for (var i = 0; i < random(2, 5); i++)
  {
    planets.push(new Planet(random(5, 20), random(width/4, 3 *width/4),
                                           random(height/4, 3 *height/4)));
  }

  recenter();
}

function draw()
{
  background(0);

  // Every planet is attracted to every other planet
  for (var i = 0; i < planets.length; i++) {
    for (var j = 0; j < planets.length; j++) {
      if (i !== j) {
        var gravity = planets[i].calculateAttraction(planets[j]);
        planets[i].applyForce(gravity);
      }
    }
  }

  recenter();

  for (var i = 0; i < planets.length; i++) {
    planets[i].update();
    planets[i].display();
  }
}

function recenter()
{
  // Keep the screen centered by translating coordinates to the
  // centroid of the moving system.
  var centroid = createVector(0, 0);

  for (var i = 0; i < planets.length; i++) {
    centroid.add(planets[i].pos);
  }

  centroid.div(planets.length);
  var center = createVector(width/2, height/2);
  var displacement = p5.Vector.sub(center, centroid);

  for (var i = 0; i < planets.length; i++) {
    planets[i].pos.add(displacement);
  }
}



