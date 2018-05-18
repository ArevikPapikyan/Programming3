socket = io.connect('http://localhost:3000');

var matrix = [];

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

socket = io.connect('http://localhost:3000');
var sentData = [];

var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var amenakerArr = [];

socket.on('sending arrays', function (data) {
    grassArr = data[0];
    xotakerArr = data[1];
    gishatichArr = data[2];
    amenakerArr = data[3];
    matrix = data[4];
});

var weather = 'winter';

socket.on('sending weather', function (data) {
    weather = data;
    console.log(weather);
        document.getElementById('exanak').innerText = weather;
});

console.log(weather);

var matrix;

function setup() {
    document.getElementById('exanak').innerText = weather;
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
}

function draw() {
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[x][y] == 2.5) {
                fill("#FCE77D");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[x][y] == 3.5) {
                fill("#FF4E4E");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
            }
            else if (matrix[x][y] == 4.5) {
                fill("pink");
            }
            rect(x * side, y * side, side, side);
        }
    }
}


// ___________UNIQUE_EVENT______________

function bodyClick(evt) {
    if (evt.pageX <= side * w && evt.pageY <= side * h) {
        i = Math.floor(evt.pageX / side);
        j = Math.floor(evt.pageY / side);
        console.log(i, j);

        if (matrix[i][j] == 1){
            grassArr.splice(grassArr.length - 1, 1);
            socket.emit('sending updated grassArr', grassArr);
        }
        else if (matrix[i][j] == 2 || matrix[i][j] == 2.5){
            xotakerArr.splice(xotakerArr.length - 1, 1);
            socket.emit('sending updated xotakerArr', xotakerArr);
        }
        else if (matrix[i][j] == 3 || matrix[i][j] == 3.5){
            gishatichArr.splice(gishatichArr.length - 1, 1);
            socket.emit('sending updated gishatichArr', gishatichArr);
        }
        else if (matrix[i][j] == 4 || matrix[i][j] == 4.5) {
            amenakerArr.splice(amenakerArr.length - 1, 1);
            socket.emit('sending updated amenakerArr', amenakerArr);
        }

        matrix[j][i] = 0;
        socket.emit('updated matrix', matrix);
    }
}
window.onclick = bodyClick;