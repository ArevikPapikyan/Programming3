var LivingCreature = require('./class.livingcreature.js');

module.exports = class Amenaker extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 24;
        this.multiply = Math.round(Math.random() * 16);
        matrix[this.y][this.x] = this.index;
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
        var vand = this.random(this.yntrelVandak(0));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
        }
    }

    utel() {
        this.energy--;
        var rand = Math.round(Math.random()*3);
        var vand = this.random(this.yntrelVandak(rand));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed/2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.sharjvel();
    }


    bazmanal() {
        if (this.index == 4) {
            var vand = this.random(this.yntrelVandak(4.5));
            if (vand) {
                var newvand = this.random(this.yntrelVandak(0));
                if (newvand) {
                    var r = (Math.round(Math.random()) / 2) + 4;
                    var newamenaker = new Amenaker(newvand[0], newvand[1], r);
                    amenakerArr.push(newamenaker);
                    matrix[newvand[1]][newvand[0]] = r;
                }
            }
        }
    }

    mahanal() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in amenakerArr) {
                if (amenakerArr[i].x == this.x && amenakerArr[i].y == this.y) {
                    amenakerArr.splice(i, 1);
                }
            }
        }
    }
}
