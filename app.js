var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('public');
});
server.listen(3000);

io.on('connection', function (socket) {
    var dataToSend = [w, h, side];
    io.emit('sending width, height, side', dataToSend);
    socket.on('matrix', function (data) {
        console.log(data);
        matrix = data;
    });

    var matrix = data;
    var w = 30;
    var h = 30;
    var side = 22;
    var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [], yndhanur = [];

    setInterval(function () {
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 1) {
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                }
                else if (matrix[y][x] == 2) {
                    xotakerArr.push(new Xotaker(x * 1, y * 1, 2));
                }
                else if (matrix[y][x] == 3) {
                    gishatichArr.push(new Gishatich(x * 1, y * 1, 3))
                }
                else if (matrix[y][x] == 4) {
                    amenakerArr.push(new Amenaker(x * 1, y * 1, 4))
                }
                console.log(matrix);
            }
            console.log(matrix);
        }
        for (var i in grassArr) {
            yndhanur.push(grassArr[i]);
        }
        for (var i in xotakerArr) {
            yndhanur.push(xotakerArr[i]);
        }
        for (var i in gishatichArr) {
            yndhanur.push(gishatichArr[i]);
        }

        var m = [grassArr, xotakerArr, gishatichArr, amenakerArr]
        io.emit('m', m)
    }, 1000);
});
