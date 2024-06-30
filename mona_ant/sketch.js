//
//  Ant randomly walking on a painting illuminating
//  the surface below.
//
var ant;
var portrait;
var range = 50 * 50;

function preload()
{
  portrait = loadImage("./mona_lisa.jpeg");
}

function setup()
{
  // Initialize Canvas to the image dimensions
  createCanvas(686, 385);
  pixelDensity(1);

  ant = new Walker()
}

function draw()
{
  background(0);
  image(portrait, 0, 0);
  ant.walk();

  loadPixels();

  // Adjust transparency of pixels based on distance from the ant
  for (var x = 0; x < width; ++x)
  {
    for (var y = 0; y < height; ++y)
    {
      var index = (y * width + x) << 2;
      var distance = pow(ant.pos.x - x, 2) + pow(ant.pos.y - y, 2);
      var opacity = (distance/range * 255.0);

      // Beyond a threshold range, dim everything else.
      if (opacity > 255)
      {
        pixels[index] *= 255.0/opacity;
        pixels[index + 1] *= 255.0/opacity;
        pixels[index + 2] *= 255.0/opacity;
      }

      pixels[index + 3] = opacity;
    }
  }

  updatePixels();
}

function Walker()
{
  this.pos = createVector(random(width), random(height));
  this.velocity = createVector(1, 1);
  this.acceleration = createVector(0, 0);
  this.pause = -1;

  this.walk = function() {

    // Change course every twenty steps
    this.pause = (this.pause  + 1) % 20;

    if (this.pause == 0)
    {
      // Go towards target
      var targetVector = createVector(random(width), random(height));
      this.acceleration = p5.Vector.sub(targetVector, this.pos);
      this.acceleration.setMag(noise(this.pos.x));
    }

    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.pos.add(this.velocity);
  }
}
