/*
 * Request handlers
 *
 */

 // Container for the users submethods
handlers = {};

handlers.hello = function(data,callback) {
	if (data.method == 'post') {
		callback(200, {'Message':'Hello world!'});
	} else {
		callback(500,{'Error':'Method not allowed'});
	}
	
}

// Not found handler
handlers.notFound = function(data,callback){
	callback(404);
};

// Export the module
module.exports = handlers;