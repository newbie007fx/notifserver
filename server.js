var server     = require('http').createServer(),
    io         = require('socket.io')(server),
    logger     = require('winston'),
    connectionsArray    = [],
    soket;

// Logger config
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { colorize: true, timestamp: true });
logger.info('SocketIO > listening on port ' + port);


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

var port =  process.env.OPENSHIFT_NODEJS_PORT || 8080;   // Port 8080 if you run locally
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"; // Listening to localhost if you run locally
server.listen(port, address);