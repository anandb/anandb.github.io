//
//  Flow Field representing the wind
//  This skews the flight trajectory 
//
function WindField() {

    // Cell Size
    this.resolution = 20;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.magnitude = -0.02;

    this.make2Darray = function(n) {
        var array = [];
        for (var i = 0; i < n; i++) {
          array[i] = [];
        }
        return array;
    };

    this.field = this.make2Darray(this.rows);

    this.init = function() {
        noiseSeed(Math.floor(random(10000)));

        // 2D Perlin Noise.
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.cols; j++) {

            var xoff = map(j, 0, this.cols, 0, 1);
            var yoff = map(i, 0, this.rows, 0, 1);
            var theta = map(noise(xoff, yoff), 0, 1, 0, PI/3);
            this.field[i][j] = createVector(cos(theta), sin(theta));
          }
        }
    }

    this.init();

    this.draw = function() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {

                var x = j * this.resolution;
                var y = i * this.resolution;
                var v = this.field[i][j].copy();
                v.mult(this.resolution);
                push();
                translate(x, y);
                line(0, 0, v.x, v.y);
                pop();
            }
        }
    }

    this.lookup = function(position) {
        var column = Math.floor(constrain(position.x / this.resolution, 0, this.cols - 1));
        var row = Math.floor(constrain(position.y / this.resolution, 0, this.rows - 1));        
        
        var wind = (column < this.cols && row < this.rows) ? this.field[row][column].copy()
                                                           : createVector(0, 0);
        wind.setMag(this.magnitude);
        return wind;
    };
    
    // Can be adjusted via the slider.
    this.setWindSpeed = function(speed) {
      this.magnitude = speed;
    }
}