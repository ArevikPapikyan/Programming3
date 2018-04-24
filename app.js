var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('public');
});
server.listen(4000);

io.on('connection', function (socket) {
    function genMatrix(w, h) {
        var matrix = [];
        for(var y = 0; y < h; y++) {
            matrix[y] = [];
            for(var x = 0; x < w; x++) {
                var r = random(105);
                if     (r < 20) r = 0;
                else if(r < 65) r = 1;
                else if(r < 90) r = 2;
                else if(r < 100)r = 3;
                else if(r < 105)r = 4;
                matrix[y][x] = r;
            }
        }
        return matrix;
    }
    
    var matrix;
    var w = 30;
    var h = 30;
    var side = 22;
    var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [], yndhanur = [];

    for(var y in matrix) {
        for(var x in matrix[y]) {
            if(matrix[y][x] == 1) {
                grassArr.push(new Grass(x*1, y*1, 1));
            }
            else if(matrix[y][x] == 2) {
                xotakerArr.push(new Xotaker(x*1, y*1, 2));
            }
            else if(matrix[y][x] == 3) {
                gishatichArr.push(new Gishatich(x*1, y*1, 3))
            }
            else if(matrix[y][x] == 4) {
                amenakerArr.push(new Amenaker(x*1, y*1, 4))
            }
        }
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

    var dataToSend = [w, h, side, grassArr, xotakerArr, gishatichArr, amenakerArr, matrix];
    io.emit('sending width, height, side and matrices', dataToSend);

});
