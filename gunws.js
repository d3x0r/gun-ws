
const Gun = require('gun/gun');

const ws = require( 'ws' );

var WebSocketServer = ws.Server;

const _debug = false;

exports.attach = function( Gun ) {

Gun.on('opt', function(ctx){
	this.to.next(ctx);
	var opt = ctx.opt["ws"];
	if(ctx.once){ return }
	var servers = [];
	var gunPeers = [];  // used as a list of connected clients.
        var acceptCallbacks = [];
        if( opt.servers )
        	servers = opt.servers;
	if( opt.server )
        	server.push( server );
	if( opt.url ) {
        	console.log( "URL option should open its own server; not implemented" );
        }
        if( opt.acceptCallback ) {
        	acceptCallbacks.push( opt.acceptCallback );
        }
        
	var gun = ctx.gun;
	var graph = ctx.graph, acks = {}, count = 0, to;

	//var fileState = fileStates[fileName] || ( fileStates[fileName] = { reading:false, writing:false, flushPending : false, disk : {} } );

	Gun.log.once(
		'ws-warning',
		'WARNING! This `gun-ws` pre-alpha module for gun for testing only!'
	);

	servers.forEach( (server)=>{
        	var wss = new WebSocketServer( {
		        server: server, // 'ws' npm
        		autoAcceptConnections : false // want to handle the request (websocket npm?)
		});
		wss.on('connection',acceptConnection );

	} )

	gun.on('out', function(msg){
		//console.log( "So now there's an OUT!" );
		this.to.next( msg );
		msg = JSON.stringify(msg);
		gunPeers.forEach( function(peer){ peer.send( msg ) })
	})

	function acceptConnection( connection ) {
		// connection.upgradeReq.headers['sec-websocket-protocol'] === (if present) protocol requested by client
		// connection.upgradeReq.url  === url request
                var accepted;
                if( acceptCallbacks.Length )
                	accepted = acceptCallbacks.find( function(cb){
                        	return cb( connection, connection.upgradeReq.headers, connection.upgradeReq.url );
                        } );
                if( accepted ) {
                	
               	}
		gunPeers.push( connection );
		connection.on( 'error',function(error){console.log( "WebSocket Error:", error) } );

		connection.on('message', function (msg) {
			//console.log( "Received:", msg );
			msg = JSON.parse(msg)
			if ("forEach" in msg) msg.forEach(m => gun.on('in', JSON.parse(m)));
			else gun.on('in', msg)
		})

		connection.on( 'close', function(reason,desc){
			// gunpeers gone.
			var i = gunPeers.findIndex( function(p){return p===connection} );
			if( i >= 0 )
				gunPeers.splice( i, 1 );

		})
	}
});
}

exports.attach( Gun );
