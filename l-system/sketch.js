//
// L-System Fractal Plant (https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant)
//
// variables : X F
// constants : + − [ ]
// start  : X
// rules  : (X → F[−X][X]F[−X]+FX), (F → FF)
// angle  : 25°
//
var angle;
var maxGen;
var reduceBy;

function setup() {
  angle = 25;

  // 6 generations
  maxGen = 6;

  // Reduce length by a little over half
  reduceBy = 0.55;
  createCanvas(640, 500);
}

function draw() {
  angleMode(DEGREES);
  angle = map(min(mouseX, width), 0, width, 10, 25);

  // Greens
  background(color("#d2e0d6"));
  stroke(color("#285134"));
  fill(color("#3ab25d"));

  // Tree leans towards right, start from lower left
  translate(width/6, height);
  rotate(angle);

  branch(0, 100);
  branch(0, 60);
}

function branch(generation, len) {
  push();

  // Sequence of Rules F[−X][X]F[−X]+FX)
  if (generation < maxGen && len > 2) {
    forward(len);

    push();
    rotate(-angle);
    branch(generation + 1, len * reduceBy);
    pop();

    push();
    branch(generation + 1, len * reduceBy);
    pop();

    forward(len);

    push();
    rotate(-angle);
    branch(generation + 1, len * reduceBy);
    pop();

    rotate(angle);
    forward(len);
    branch(generation + 1, len * reduceBy);

    // Draw a leaf
    noStroke();
    ellipse(0, 0, 1, 2);
  }

  pop();
}

function forward(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
}
