module.exports = class Bomb{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1],
           [this.x - 2, this.y],
           [this.x + 1, this.y],
           [this.x + 2, this.y],
           [this.x + 3, this.y],
           [this.x, this.y + 2],
           [this.x, this.y + 3],
           [this.x, this.y - 2],
           [this.x, this.y - 3],
           [this.x - 2, this.y + 2],
           [this.x - 3, this.y + 3],
           [this.x + 2, this.y + 2],
           [this.x + 3, this.y + 3],
           [this.x - 2, this.y - 2],
           [this.x - 3, this.y - 3],
           [this.x + 2, this.y - 3],
           [this.x + 3, this.y - 3]
       ];
 
    }

    random(arr) {
        return arr[ Math.round(Math.random() * arr.length) ];
    }

    yntrelVandak(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }

    paytel() {
        for (var i in this.directions) {
            if (this.directions[i][0] < matrix[0].length && this.directions[i][0] >= 0 && this.directions[i][1] < matrix.length) {
                matrix[this.directions[i][0]][this.directions[i][1]] = 5;
            }
        }
    }
}
