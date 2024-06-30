//
//  Define a population that evolves towards the
//  target.
//
function Population()
{
  // The entire pool is replaced after every generation.
  this.poolSize = random(10, 20);
  this.generation = 0;
  this.members = [];
  this.matingPool = [];
  this.mutationFactor = 0.05;
  
  this.current = function() {
    return this.generation;
  }
  
  this.setMutationFactor = function(m) {
    this.mutationFactor = m;
  }
  
  this.setPopulationSize = function(size) {
    this.poolSize = size;
  }
  
  this.add = function(x) {
    this.members.push(x);
  }
  
  this.run = function() { 
    ++this.generation;
    for (var i = 0; i < this.members.length; i++) {
      this.members[i].launch();
    }
  }
  
  this.iterator = function() {
    var nextIndex = 0;
    var members = this.members;
    
    return {
      next: function() {
          return nextIndex < members.length ? members[nextIndex++] : null;
      },
      hasNext: function() {
          return nextIndex < members.length;
      }
    };
  }
  
  this.isDone = function() {
    // Return true when all balls complete flight.
    return this.members.every(function(x) { return !x.isAlive(); })
  }
  
  this.select = function() {
    // Reset Mating Pool, This is much larger than the population size
    // as it is weighted by fitness.
    this.matingPool = [];
    for (var i = 0; i < this.members.length; ++i) {
      var copies = this.members[i].calcFitness() * 1000;
      
      for (var j = 0; j < copies; ++j) {
        this.matingPool.push(new Ball(this.members[i].dna));
      }
    }
  }
  
  this.reproduce = function() {
    this.members = [];
    for (var i = 0; i < this.poolSize; ++i) {
      // Crossover
      var mom = this.matingPool[floor(random(0, this.matingPool.length))];
      var dad = this.matingPool[floor(random(0, this.matingPool.length))];
      var childGenes = dad.dna.crossover(mom.dna);
      
      // Mutate
      childGenes.mutate(this.mutationFactor);
      this.members.push(new Ball(childGenes));
    }
  }
  
  this.render = function(windField, target) {
    for (var iter = this.iterator(); iter.hasNext();) {
      var ball = iter.next();
      ball.handleWind(windField);
      ball.applyGravity();
      ball.update();
      ball.checkTarget(target);
      target.paintCollision(ball);
      ball.display();
    }
  }
  
  for (var i = 0; i < this.poolSize; i++) {
    var ball = new Ball();
    this.add(ball);
  }
  
  this.run();
}