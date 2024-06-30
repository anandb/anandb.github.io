//
//  Try to find the right combination of diameter, angle of launch, 
//  and speed and mass to hit the target.
//
var population;
var windField;
var windSpeedSlider;
var mutationSlider;
var populationSlider;
var target;

function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent('canvas');
  
  // Rectangular plate to hit
  target = new Target();
  
  // Flowfield for Wind 
  windField = new WindField();
  
  // Parameter Adjustments
  windSpeedSlider = createSlider(0, 0.1, 0.04, 0.001).parent('windspeed');
  mutationSlider = createSlider(0, 0.2, 0.05, 0.01).parent('mutation');
  populationSlider = createSlider(0, 40, 10, 1).parent('population');
  
  // Pass a mutation factor
  population = new Population();
}

function draw() {
  background(200);  
  drawBorder();
  
  // Display generation count on the top right
  textSize(16);
  var generation = "Gen : " + population.current() + "   ";
  text(generation, width - textWidth(generation), 30);
  
  // Run a generation, gather fitness, evolve.
  if (population.isDone())
  {
    population.setPopulationSize(populationSlider.value());
    population.setMutationFactor(mutationSlider.value());
    population.select();
    population.reproduce();
    population.run();
  }
  
  windField.setWindSpeed(-windSpeedSlider.value());
  population.render(windField, target);
  target.render();
}

function drawBorder() {
  strokeWeight(1);
  stroke(0);
  noFill();
  rect(0, 0, width - 1, height - 1);
}
