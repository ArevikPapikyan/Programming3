var LivingCreature = require('./class.livingcreature.js');

module.exports = class Gishatich extends LivingCreature{
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
    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        return super.yntrelVandak(ch);
    }

    sharjvel() {
        var vand = this.random(this.yntrelVandak(0));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 3;
        }
    }

    utel() {
        this.energy--;
        var vand = this.random(this.yntrelVandak(2));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed/2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 3;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.sharjvel();
    }

    bazmanal() {
        var vand = this.random(this.yntrelVandak(0));
        if (vand && this.energy >= this.speed) {
            this.energy = 1;
            var newgishatich = new Gishatich(vand[0], vand[1], 3);
            gishatichArr.push(newgishatich);
        }
    }

    mahanal() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
    }
}
