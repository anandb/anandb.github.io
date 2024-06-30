//
//  School of fish fleeing from a shark.
//  Mouse Click moves shark

var shark;
var fish = [];

function setup() {
  shark = new Shark();

  for (var i = 0; i < random(10, 30); i++) {
    fish.push(new Boid());
  }

  createCanvas(640, 480);
}

function draw() {
  background(116, 167, 178);

  shark.display();

  // Update Swarm
  for (var i = 0; i < fish.length; i++) {
    fish[i].behaviors(fish, shark);
    fish[i].update();
    fish[i].display();
  }
}

function mouseClicked() {
  shark.move(mouseX, mouseY);
  // prevent default
  return false;
}
