<<<<<<< HEAD
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
=======
socket = io.connect('http://localhost:3000');
var sentData = [];

var w = sentData[0];
var h = sentData[1];
var side = sentData[2];
var grassArr = sentData[3];
var xotakerArr = sentData[4];
var gishatichArr = sentData[5];
var amenakerArr = sentData[6];

socket.on('sending width, height, side', function (data) {
    sentData.push(...data);
    w = sentData[0];
    h = sentData[1];
    side = sentData[2];
});

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = random(105);
            if (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            else if (r < 105) r = 4;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

var matrix;
>>>>>>> d91b085c1d897c974677e2cf011af1cce28ba99f

function setup() {
    matrix = genMatrix(w, h);
    console.log(matrix);
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
}
console.log(matrix);
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