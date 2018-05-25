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

var sentData = [];

var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var amenakerArr = [];
var aygepanArr = [];

socket.on('sending grassArr', function (data) {
    grassArr = data;
});
socket.on('sending xotakerArr', function (data) {
    xotakerArr = data;
});
socket.on('sending gishatichArr', function (data) {
    gishatichArr = data;
});
socket.on('sending amenakerArr', function (data) {
    amenakerArr = data;
});
socket.on('sending aygepanArr', function (data) {
    aygepanArr = data;
});

var weather = 'գարուն';

socket.on('sending weather', function (data) {
    weather = data;
    document.getElementById('exanak').innerText = weather;
});

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
            else if (matrix[y][x] == 1 && weather == 'գարուն') {
                fill("green");
            }
            else if (matrix[y][x] == 1 && weather == 'ամառ') {
                fill("#5DD100");
            }
            else if (matrix[y][x] == 1 && weather == 'աշուն') {
                fill("#BCE500");
            }
            else if (matrix[y][x] == 1 && weather == 'ձմեռ') {
                fill("#82FF49");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 2.5) {
                fill("#FCE77D");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 3.5) {
                fill("#FF4E4E");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
            }
            else if (matrix[y][x] == 4.5) {
                fill("pink");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
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

        directions = [
            [i, j],
            [i - 1, j - 1],
            [i, j - 1],
            [i + 1, j - 1],
            [i - 1, j],
            [i - 1, j + 1],
            [i, j + 1],
            [i + 1, j + 1],
            [i + 1, j]
        ]

        for (k in directions) {
            var a = directions[k][0];
            var b = directions[k][1];

            if (a >= 0 && a < matrix[0].length && b >= 0 && b < matrix.length) {

                if (matrix[a][b] == 1) {
                    for (var i in grassArr) {
                        if (grassArr[i].x == a && grassArr[i].y == b) {
                            grassArr.splice(i, 1);
                        }
                    }
                    socket.emit('sending updated grassArr', grassArr);
                }
                else if (matrix[a][b] == 2 || matrix[a][b] == 2.5) {
                    for (var i in xotakerArr) {
                        if (xotakerArr[i].x == a && xotakerArr[i].y == b) {
                            xotakerArr.splice(i, 1);
                        }
                    }
                    socket.emit('sending updated xotakerArr', xotakerArr);
                }
                else if (matrix[a][b] == 3 || matrix[a][b] == 3.5) {
                    for (var i in gishatichArr) {
                        if (gishatichArr[i].x == a && gishatichArr[i].y == b) {
                            gishatichArr.splice(i, 1);
                        }
                    }
                    socket.emit('sending updated gishatichArr', gishatichArr);
                }
                else if (matrix[a][b] == 4 || matrix[a][b] == 4.5) {
                    for (var i in amenakerArr) {
                        if (amenakerArr[i].x == a && amenakerArr[i].y == b) {
                            amenakerArr.splice(i, 1);
                        }
                    }
                    socket.emit('sending updated amenakerArr', amenakerArr);
                }
                else if (matrix[a][b] == 5) {
                    for (var i in aygepanArr) {
                        if (aygepanArr[i].x == a && aygepanArr[i].y == b) {
                            aygepanArr.splice(i, 1);
                        }
                    }
                    socket.emit('sending updated aygepanArr', aygepanArr);
                }
                matrix[b][a] = 0;
            }

        }

        socket.emit('updated matrix', matrix);
    }
}
window.onclick = bodyClick;