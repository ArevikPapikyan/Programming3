socket = io.connect('http://localhost:3000');

var matrix = [];
var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = []; yndhanur = [];

socket.on('matrix', function (data) {
    matrix = [];
    for (i in data) {
        matrix.push(data[i]);
    }
});

var w = 30;
var h = 30;
var side = 22;

var w, h, side;

socket.on('sending w, h, side', function (data) {
    w = data[0];
    h = data[1];
    side = data[2];
})

socket.on('sending arrays', function (data) {
    grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = []; yndhanur = [];
    grassArr = data[0];
    xotakerArr = data[1];
    gishatichArr = data[2];
    amenakerArr = data[3];
    yndhanur = data[4];
});
socket = io.connect('http://localhost:3000');
var sentData = [];

var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var amenakerArr = [];

var matrix;

function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(30);
}
// console.log(matrix);
socket.emit('matrix'. matrix);

socket.on('m', function (data) {
    grassArr = data[0];
    xotakerArr = data[1];
    gishatichArr = data[2];
    amenakerArr = data[3];
    matrix = data[4];
});

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