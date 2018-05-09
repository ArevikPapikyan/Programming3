socket = io.connect('http://localhost:4000');

var w = 30;
var h = 30;
var side = 22;
var matrix = [];
var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [];

socket.on('matrix', function (data) {
    matrix = [];
    for (i in data) {
        matrix.push(data[i]);
    }
    // console.log(matrix);
});

socket.on('sending arrays', function (data) {
    grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [];
    grassArr = data[0];
    xotakerArr = data[1];
    gishatichArr = data[2];
    amenakerArr = data[3];
});

function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
}

function draw() {
    for(var y in matrix) {
        for(var x in matrix[y]) {
            if(matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if(matrix[y][x] == 1) {
                fill("green");
            }
            else if(matrix[y][x] == 2) {
                fill("yellow");
            }
            else if(matrix[y][x] == 3) {
                fill("red");
            }
            else if(matrix[y][x] == 4) {
                fill("pink");
            }
            rect(x * side, y * side, side, side);
        }
    }
}