var LivingCreature = require('./class.livingcreature.js');
var Grass = require('./class.grass.js');

module.exports = class Aygepan extends LivingCreature {
    constructor(x, y, index) {
        super(x, y);
    }

    sharjvel() {
        var vand = this.random(this.yntrelVandak(0));
        if (vand) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 5;
            this.multiply = 0;
        }
    }

    xot () {
        var grass = this.random(this.yntrelVandak(0));
        if (grass) {
            var newgrass = new Grass(grass[0], grass[1], 1);
            grassArr.push(newgrass);
            matrix[grass[1]][grass[0]] = 1;
        }
    }
}