var logger     = require('winston'),
    connectionsArray    = [],
    soket;

var http = require('http');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8080);

var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(app.get('port'), app.get('ip'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true, timestamp: true });


io.sockets.on( 'connection', function ( socket ) {
    
    console.log('Number of connections:' + connectionsArray.length);

	socket.on('send_donatur', function (message) {
	  socket.broadcast.emit('broadcast_donatur', message);
	  logger.info('ElephantIO broadcast > ' + JSON.stringify(message));
    });

    socket.on('konfirm_humas', function (message) {
        socket.broadcast.emit('b_konfirm_humas', message);
        logger.info('ElephantIO broadcast > ' + JSON.stringify(message));
    });

    socket.on('konsul_humas', function (message) {
        socket.broadcast.emit('b_konsul_humas', message);
        logger.info('ElephantIO broadcast > ' + JSON.stringify(message));
    });
	
    socket.on('disconnect', function () {
        var socketIndex = connectionsArray.indexOf( socket );
        console.log('socket = ' + socketIndex + ' disconnected');
        if (socketIndex >= 0) {
            connectionsArray.splice( socketIndex, 1 );
        }
    });

    console.log( 'A new socket is connected!' );
    connectionsArray.push( socket );
    soket = socket;
    
});
