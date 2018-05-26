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

global.grassCount = 0;
global.arakanXotakerCount = 0;
global.igakanXotakerCount = 0;
global.arakanGishatichCount = 0;
global.igakanGishatichCount = 0;
global.arakanAmenakerCount = 0;
global.igakanAmenakerCount = 0;
global.aygepanCount = 0;

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

    setInterval(function () {
        var grassArr = [], xotakerArr = [], gishatichArr = [], amenakerArr = [], aygepanArr = [];
        grassCount = 0;
        arakanXotakerCount = 0;
        igakanXotakerCount = 0;
        arakananGishatichCount = 0;
        igakanGishatichCount = 0;
        arakanAmenakerCount = 0;
        igakanAmenakerCount = 0;
        aygepanCount = 0;
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 1) {
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                    grassCount++;
                }
                else if (matrix[y][x] == 2 || matrix[y][x] == 2.5) {
                    var r = (Math.round(Math.random()) / 2) + 2;
                    matrix[y][x] = r;
                    xotakerArr.push(new Xotaker(x * 1, y * 1, r));
                    if (r == 2) arakanXotakerCount++;
                    else igakanXotakerCount++;
                }
                else if (matrix[y][x] == 3 || matrix[y][x] == 3.5) {
                    var r = (Math.round(Math.random()) / 2) + 3;
                    matrix[y][x] = r;
                    gishatichArr.push(new Gishatich(x * 1, y * 1, r));
                    if (r == 3) arakananGishatichCount++;
                    else igakanGishatichCount++;
                }
                else if (matrix[y][x] == 4 || matrix[y][x] == 4.5) {
                    var r = (Math.round(Math.random()) / 2) + 4;
                    matrix[y][x] = r;
                    amenakerArr.push(new Amenaker(x * 1, y * 1, r));
                    if (r == 4) arakanAmenakerCount++;
                    else igakanAmenakerCount++;
                }
                else if (matrix[y][x] == 5) {
                    aygepanArr.push(new Aygepan(x * 1, y * 1, 5));
                    aygepanCount++;
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

io.on('decrement the grassCount', function () {
    grassCount--;
});
io.on('decrement the arakanXotakerCount', function () {
    arakanXotakerCount--;
});
io.on('decrement the igakanXotakerCount', function () {
    igakanXotakerCount--;
});
io.on('decrement the arakanGishatich', function () {
    arakananGishatichCount--;
});
io.on('decrement the igakanGishatichCount', function () {
    igakanGishatichCount--;
});
io.on('decrement the arakanAmenakerCount', function () {
    arakanAmenakerCount--;
});
io.on('decrement the igakanAmenakerCount', function () {
    igakanAmenakerCount--;
});
io.on('decrement the aygepanCount', function () {
    aygepanCount--;
});

// ___________STATISTICS______________

var statistics = {
    'խոտերի քանակ': grassCount,
    'արական խոտակերների քանակ': arakanXotakerCount,
    'իգական խոտակերնրի քանակ': igakanXotakerCount,
    'արական գիշատիչների քանակ': arakanGishatichCount,
    'իգական գիշատիչների քանակ': igakanGishatichCount,
    'արական ամենակերների քանակ': arakanAmenakerCount,
    'իգական ամենակերների քանակ': igakanAmenakerCount,
    'այգեպանների քանակ': aygepanCount
}

setInterval(function () {
    statistics["խոտերի քանակ"] = grassCount;
    statistics["արական խոտակերների քանակ"] = arakanXotakerCount;
    statistics["իգական խոտակերնրի քանակ"] = igakanXotakerCount;
    statistics["արական գիշատիչների քանակ"] = arakanGishatichCount;
    statistics["իգական գիշատիչների քանակ"] = igakanGishatichCount;
    statistics["արական ամենակերների քանակ"] = arakanAmenakerCount;
    statistics["իգական ամենակերների քանակ"] = igakanAmenakerCount;
    statistics["այգեպանների քանակ"] = aygepanCount

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
