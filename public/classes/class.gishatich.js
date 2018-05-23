var LivingCreature = require('./class.livingcreature.js');

module.exports = class Gishatich extends LivingCreature{
    constructor(x, y, index) {
        super(x, y);
        this.index = index;
        this.multiply = Math.round(Math.random() * 8);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 8;
    }

    sharjvel() {
        var vand = this.random(this.yntrelVandak(0));
        if (vand && this.multiply >= this.speed / 4) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 2;
            this.multiply = 0;
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
        if (this.index == 3) {
            var vand = this.random(this.yntrelVandak(3.5));
            if (vand) {
                var newvand = this.random(this.yntrelVandak(0));
                if (newvand) {
                    var r = (Math.round(Math.random()) / 2) + 3;
                    var newgishatich = new Gishatich(newvand[0], newvand[1], r);
                    gishatichArr.push(newgishatich);
                    matrix[newvand[1]][newvand[0]] = r;
                }
            }
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
