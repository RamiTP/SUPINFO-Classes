// Requires
var http 				= require('http'), 	// http://nodejs.org/api/http.html
	url					= require('url'),
	io 					= require('socket.io'),
	pageController		= require('./controllers/page_controller.js'),
	messagesController 	= require('./controllers/messages_controller.js');

// Globals
var port 	= 1337,
	server 	= null;

server = http.createServer(function(req, res) {

	console.log(new Date() + " " + req.method + " " + req.url);
	var path = url.parse(req.url).pathname;

	// Routing is manually managed here
	if (req.method == "GET") 
	{
		if (path == "/") 
		{ 
			// Display Home Page
			pageController.getHome(req, res);
		}
		else 
		{ 
			// Request for other ressources (like assets)
			pageController.get(req, res);
		}
	}
	else 
	{
		res.end();
	}
});

server.listen(port);
console.log(new Date() + ' Server running on port ' + port);

// Socket.IO
io = io.listen(server);
messagesController.connectTo(io.of('/messages')); // Connect the messages controller to a socket,
												  // events will be received and emitted by the controller
												  // through this socket