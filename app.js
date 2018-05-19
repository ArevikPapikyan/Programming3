var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require('./public/classes/class.grass.js');
var Xotaker = require('./public/classes/class.xotaker.js');
var Gishatich = require('./public/classes/class.gishatich.js');
var Amenaker = require('./public/classes/class.amenaker.js');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('public');
});
server.listen(3000);

global.grassArr = [];
global.xotakerArr = [];
global.gishatichArr = [];
global.amenakerArr = [];

global.w = 30;
global.h = 30;
global.side = 22;

io.sockets.emit('sending w, h, side', [w, h, side]);

global.matrix = [];

global.weather = 'spring';
io.emit('sending weather', weather);

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 106);
            if (r < 20) r = 0;
            else if (r < 65) r = 1; // grass
            else if (r < 90) r = 2; // xotaker
            else if (r < 100) r = 3; // gishatich
            else if (r < 105) r = 4; // amenaker
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = genMatrix(w, h);
io.on('connection', function (socket) {
    io.emit('sending width, height, side', [w, h, side]);

    var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [];

    setInterval(function () {
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 1) {
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                }
                else if (matrix[y][x] == 2) {
                    var r = (Math.round(Math.random()) / 2) + 2;
                    matrix[x][y] = r;
                    xotakerArr.push(new Xotaker(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 3) {
                    var r = (Math.round(Math.random()) / 2) + 3;
                    matrix[x][y] = r;
                    gishatichArr.push(new Gishatich(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 4) {
                    var r = (Math.round(Math.random()) / 2) + 4;
                    matrix[x][y] = r;
                    amenakerArr.push(new Amenaker(x * 1, y * 1, r))
                }
            }
        }

        io.sockets.emit("matrix", matrix);

        for (var i in grassArr) {
            grassArr[i].mul();
        }

        for (var i in xotakerArr) {
            xotakerArr[i].bazmanal();
            xotakerArr[i].utel();
            xotakerArr[i].mahanal();
        }

        for (var i in gishatichArr) {
            gishatichArr[i].bazmanal();
            gishatichArr[i].utel();
            gishatichArr[i].mahanal();
        }

        for (var i in amenakerArr) {
            amenakerArr[i].bazmanal();
            amenakerArr[i].utel();
            amenakerArr[i].mahanal();
        }

        io.emit('sending arrays', [grassArr, xotakerArr, gishatichArr, amenakerArr]);

    }, 2000);

});


io.on('updated matrix', function (data) {
    matrix = data;
})

io.on('sending updated grassArr', function (data) {
    grassArr = data;
})

io.on('sending updated xotakerArr', function (data) {
    xotakerArr = data;
})

io.on('sending updated gishatichArr', function (data) {
    gishatichArr = data;
})

io.on('sending updated amenakerArr', function (data) {
    amenakerArr = data;
})


// ___________STATISTICS______________

var statistics = {
    'xoteri qanak': grassArr.length,
    'xotakerneri qanak': xotakerArr.length,
    'gishatichneri qanak': gishatichArr.length,
    'amenakerneri qanak': amenakerArr.length,
}

setInterval(function () {
    statistics["xoteri qanak"] = grassArr.length;
    statistics["xotakerneri qanak"] = xotakerArr.length;
    statistics["gishatichneri qanak"] = gishatichArr.length;
    statistics["amenakerneri qanak"] = amenakerArr.length;

    fs.writeFile('statistics.json', JSON.stringify(statistics), function (err) {
        if (err) throw err;
    });

    // ______________WEATHER______________


    if (weather == 'spring') {
        weather = 'summer';
    }
    else if (weather == 'summer') {
        weather = 'autumn';
    }
    else if (weather == 'autumn') {
        weather = 'winter';
    }
    else if (weather == 'winter') {
        weather = 'spring';
    }

    io.emit('sending weather', weather);

}, 10000);
