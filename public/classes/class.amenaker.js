var LivingCreature = require('./class.livingcreature.js');

module.exports = class Amenaker extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 24;
        this.multiply = Math.round(Math.random() * 16);
        // matrix[this.y][this.x] = this.index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    sharjvel() {
        var vand = random(this.yntrelVandak(0));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
        }
    }

    utel() {
        this.energy--;
        var rand = Math.round(random(1, 3));
        var vand = random(this.yntrelVandak(rand));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed/2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
            for (var i in yndhanur) {
                if (yndhanur[i].x == this.x && yndhanur[i].y == this.y) {
                    yndhanur.splice(i, 1);
                    break;
                }
            }
        }
        else this.sharjvel();
    }

    bazmanal() {
        var vand = random(this.yntrelVandak(0));
        if (vand && this.energy >= this.speed) {
            this.energy = 1;
            var newamenaker = new Amenaker(vand[0], vand[1], 3);
            amenakerArr.push(newamenaker);
        }
    }
}
