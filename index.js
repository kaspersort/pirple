/*
 * Primary file for the API
 *
 */

// Dependencies
const config = require('./config/config');

let http  = require('http');
let url   = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let handlers = require('./lib/handlers');


// Instantiate the HTTP server
let httpServer = http.createServer(function(req, res) {
	unifiedServer(req, res);
});

// Start the server
httpServer.listen(config.httpPort,function() {
	console.log('The server is listning on port '+config.httpPort+' in '+config.envName+' mode!\n');
});


// All the server logic for both the http and https server
var unifiedServer = function (req,res) {
	// Get the url and parse it
	let parsedUrl = url.parse(req.url,true);

	// Get the path from url
	let path = parsedUrl.pathname;
	let trimmedPath = path.replace(/^\/+|\/+$/g,'');

	// Get the headers as an object
	let headers = req.headers;

	// Get the http method
	let method = req.method.toLowerCase(); 

	// Get the payload, if there is any
	let decoder = new StringDecoder('utf-8');
	let buffer = '';
	// on request event 'data'
	req.on('data', function(data){
		buffer += decoder.write(data);
	});

	req.on('end', function(){
		buffer += decoder.end();

		// Chose the handler this request goes to. If one is not found use notFound
		let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

		// Construct the data object to send to the handler
		let data = {
			'trimmedPath': trimmedPath,
			'method': method,
			'headers': headers,
			'payload': buffer
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, function(statusCode, payload) {
			// Use the status code called back by the handler, or default to 200
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

			// Use the payload called back by the handler, or default to en empty object
			payload = typeof(payload) == 'object' ? payload : {};

			// Convert the object to a string
			let payloadString = JSON.stringify(payload);

			// Return the response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log the request path
			console.log('Returning this response: ',statusCode,payloadString);

		});
	
	});
};

// request route / handler
let router = {
	'hello': handlers.hello
};
