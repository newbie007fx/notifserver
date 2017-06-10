var logger     = require('winston'),
    connectionsArray    = [],
    soket;

var http = require('http');
var express = require('express');
var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(app.get('port'), app.get('ip'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Logger config
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true, timestamp: true });


io.sockets.on( 'connection', function ( socket ) {
    
    console.log('Number of connections:' + connectionsArray.length);

	socket.on('konfirmasi', function (message) {
	  socket.broadcast.emit('broadcast', message);
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
