var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require('./public/classes/class.grass.js');
var Xotaker = require('./public/classes/class.xotaker.js');
var Gishatich = require('./public/classes/class.gishatich.js');
var Amenaker = require('./public/classes/class.amenaker.js');
var Aygepan = require('./public/classes/class.aygepan.js');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('public');
});
server.listen(3000);

global.grassArr = [];
global.xotakerArr = [];
global.gishatichArr = [];
global.amenakerArr = [];
global.aygepanArr = [];

global.w = 30;
global.h = 30;
global.side = 22;

global.matrix = [];

global.weather = 'գարուն';
io.emit('sending weather', weather);

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 110);
            if (r < 20) r = 0;
            else if (r < 65) r = 1; // grass
            else if (r < 90) r = 2; // xotaker
            else if (r < 100) r = 3; // gishatich
            else if (r < 105) r = 4; // amenaker
            else if (r < 110) r = 5; // aygepan
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = genMatrix(w, h);

io.on('connection', function (socket) {
    var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [], aygepanArr = [];

    setInterval(function () {
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 1) {
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                }
                else if (matrix[y][x] == 2) {
                    var r = (Math.round(Math.random()) / 2) + 2;
                    matrix[y][x] = r;
                    xotakerArr.push(new Xotaker(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 3) {
                    var r = (Math.round(Math.random()) / 2) + 3;
                    matrix[y][x] = r;
                    gishatichArr.push(new Gishatich(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 4) {
                    var r = (Math.round(Math.random()) / 2) + 4;
                    matrix[y][x] = r;
                    amenakerArr.push(new Amenaker(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 5) {
                    aygepanArr.push(new Aygepan(x * 1, y * 1, 5));
                }
            }
        }

        io.sockets.emit("matrix", matrix);


        for (var i in grassArr) {
            if (weather == 'ամառ') {
                grassArr[i].multiply = 8;
            }
            else if (weather == 'աշուն') {
                grassArr[i].multiply = 4;
            }
            else if (weather == 'ձմեռ') {
                grassArr[i].multiply = 2;
            }
            grassArr[i].mul();
            grassArr[i].mahanal();
        }
        io.emit('sending grassArr', grassArr);

        for (var i in xotakerArr) {
            if (weather == 'ամառ') {
                xotakerArr[i].energy = 8;
            }
            else if (weather == 'աշուն') {
                xotakerArr[i].energy = 6;
            }
            else if (weather == 'ձմեռ') {
                xotakerArr[i].energy = 4;
            }
            xotakerArr[i].bazmanal();
            xotakerArr[i].utel();
            xotakerArr[i].mahanal();
        }
        io.emit('sending xotakerArr', xotakerArr);

        for (var i in gishatichArr) {
            if (weather == 'ամառ') {
                gishatichArr[i].energy = 8;
            }
            else if (weather == 'աշուն') {
                gishatichArr[i].energy = 6;
            }
            else if (weather == 'ձմեռ') {
                gishatichArr[i].energy = 4;
            }
            gishatichArr[i].bazmanal();
            gishatichArr[i].utel();
            gishatichArr[i].mahanal();
        }
        io.emit('sending gishatichArr', gishatichArr);

        for (var i in amenakerArr) {
            if (weather == 'ամառ') {
                amenakerArr[i].energy = 8;
            }
            else if (weather == 'աշուն') {
                amenakerArr[i].energy = 6;
            }
            else if (weather == 'ձմեռ') {
                amenakerArr[i].energy = 4;
            }
            amenakerArr[i].bazmanal();
            amenakerArr[i].utel();
            amenakerArr[i].mahanal();
        }
        io.emit('sending amenakerArr', amenakerArr);

        for (var i in aygepanArr) {
            aygepanArr[i].sharjvel();
            if (weather != 'ձմեռ') {
                aygepanArr[i].xot();
            }
            io.emit('sending aygepanArr', aygepanArr);
        }


    }, 2000);

});


io.on('updated matrix', function (data) {
    matrix = data;
});
io.on('sending updated grassArr', function (data) {
    grassArr = data;
});
io.on('sending updated xotakerArr', function (data) {
    xotakerArr = data;
});
io.on('sending updated gishatichArr', function (data) {
    gishatichArr = data;
});
io.on('sending updated amenakerArr', function (data) {
    amenakerArr = data;
});
io.on('sending updated aygepanArr', function (data) {
    aygepanArr = data;
})

// ___________STATISTICS______________

var statistics = {
    'խոտերի քանակ': grassArr.length,
    'խոտակերների քանակ': xotakerArr.length,
    'գիշատիչների քանակ': gishatichArr.length,
    'ամենակերների քանակ': amenakerArr.length,
    'այգեպանների քանակ': aygepanArr.length
}

setInterval(function () {
    statistics["խոտերի քանակ"] = grassArr.length;
    statistics["խոտակերների քանակ"] = xotakerArr.length;
    statistics["գիշատիչների քանակ"] = gishatichArr.length;
    statistics["ամենակերների քանակ"] = amenakerArr.length;
    statistics["այգեպանների քանակ"] = aygepanArr.length;

    fs.writeFile('statistics.json', JSON.stringify(statistics), function (err) {
        if (err) throw err;
    });

    
    // ______________WEATHER_SWITCHING______________

    if (weather == 'գարուն') {
        weather = 'ամառ';
    }
    else if (weather == 'ամառ') {
        weather = 'աշուն';
    }
    else if (weather == 'աշուն') {
        weather = 'ձմեռ';
    }
    else if (weather == 'ձմեռ') {
        weather = 'գարուն';
    }

    io.emit('sending weather', weather);

}, 10000);
