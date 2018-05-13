socket = io.connect('http://localhost:3000');

var w = 30;
var h = 30;
var side = 22;
var matrix = [];
var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = []; yndhanur = [];

socket.on('matrix', function (data) {
    matrix = [];
    for (i in data) {
        matrix.push(data[i]);
    }
});

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

// var w = sentData[0];
// var h = sentData[1];
// var side = sentData[2];
var grassArr = sentData[0];
var xotakerArr = sentData[1];
var gishatichArr = sentData[2];
var amenakerArr = sentData[3];

var matrix;

function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(30);
}
// console.log(matrix);
socket.emit('matrix'. matrix);

socket.on('m', function (data) {
    grassArr = sentData[3];
    xotakerArr = sentData[4];
    gishatichArr = sentData[5];
    amenakerArr = sentData[6];
    matrix = sentData[7];
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