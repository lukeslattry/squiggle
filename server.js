var restify = require('restify');
var api = require('./lib/api');

var server = restify.createServer({
	name: 'squiggle'
});


// Static Serving for Dashboard
server.get('/', restify.serveStatic({
	'directory': 'public',
	'default': 'dashboard.html'
}));

server.get(/.css/, restify.serveStatic({
	'directory': 'public'
}));

server.get(/.images/, restify.serveStatic({
	'directory': 'public'
}));

server.get(/.js/, restify.serveStatic({
	'directory': 'public'
}));


server.listen(8080, function() {
	console.log("Server listening on port 8080");
})