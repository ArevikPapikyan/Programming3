var LivingCreature = require('./class.livingcreature.js');

module.exports = class Amenaker extends LivingCreature {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
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
        var vand = this.random(this.yntrelVandak(3));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed / 2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    if (gishatichArr[i].r == 4) arakanGishatichCount--;
                    else igakanGishatichCount--;
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
                    if(amenakerArr[i].r == 4) arakanAmenakerCount++;
                    else igakanAmenakerCount++;
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
                    if (amenakerArr[i].r == 4) arakanAmenakerCount--;
                    else igakanAmenakerCount--;
                }
            }
        }
    }
}
