//
//  DNA object with four genes, each is a real value b/n 0 to 1
//
function DNA(genes)
{
    this.genes = [random(), random(), random(), random()];
    
    if (arguments.length > 0) {
        this.genes = genes;
    }
    
    // Primary evolution mechanism
    this.crossover = function(parent) {
      var childGenes = this.genes.slice();
      childGenes.splice(2, 2, parent.genes[2], parent.genes[3]);
      
      return new DNA(childGenes);
    }
    
    // Also tweak the genes using a mutation factor
    // This is totally random, a higher mutation factor will
    // cause the algorithm to take longer to converge
    this.mutate = function(m) {
      for(var i = 0; i < this.genes.length; ++i) {
        if (random() < m)  
          this.genes[i] = random();
      }
    }
}