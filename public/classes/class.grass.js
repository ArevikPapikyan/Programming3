var LivingCreature = require('./class.livingcreature.js');

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = Math.round(Math.random() * 16);
        this.speed = 8;
    }

    mul() {
        this.multiply++;
        this.direction = this.random(this.yntrelVandak(0));
        if (this.multiply >= this.speed && this.direction) {
            var newGrass = new Grass(this.direction[0], this.direction[1], this.index);
            grassArr.push(newGrass);
            grassCount++;
            matrix[this.direction[1]][this.direction[0]] = this.index;
            this.multiply = 0;
        }
    }

    mahanal() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                    grassCount--;
                }
            }
        }
    }
}
