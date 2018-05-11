var LivingCreature = require('./class.livingcreature.js');

module.exports = class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = Math.round(Math.random() * 8);
        this.speed = 8;
    }

    mul() {
        this.multiply++;
        this.direction = Math.random(this.yntrelVandak(0));
        if (this.multiply >= this.speed && this.direction) {
            var newGrass = new Grass(this.direction[0], this.direction[1], this.index);
            grassArr.push(newGrass);
            console.log(this.direction[0], this.direction[1])
            matrix[this.direction[1]][this.direction[0]] = this.index;
            this.multiply = 0;
        }
    }
}
