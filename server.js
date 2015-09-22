var http = require("http");
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var api = require("./lib/api");
var traffic = require("./lib/traffic_recorder");

function send404(response) {
	response.writeHead(404, {'Content-Type' : 'text/plain'});
	response.write('404');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type' : mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function serveStatic(response, absPath) {
	
	fs.exists(absPath, function(exists) {
		if (exists) {
			fs.readFile(absPath, function(err, data) {
				if (err) {
					send404(response);
				}
				else {
					sendFile(response, absPath, data);
				}
			});
		}
		else {
			send404(response);
		}
	});
}

var server = http.createServer(function(request, response) {
	
	if (request.url == '/') {
		var filePath = false;

		if (request.url == '/') {
			filePath = 'public/dashboard.html';
			console.log(request.headers);
		}
		else {
			filePath = 'public' + request.url;
		}

		var absPath = './' + filePath;
		serveStatic(response, absPath);
	}
	
	else if (request.url.slice(0,5) == '/api/') {
		var url_parts = url.parse(request.url, true);
		var reqPath = url_parts.pathname;
		var path_parts = reqPath.split('/');
		// var params = url_parts.query;
		var pageID = path_parts[path_parts.length-1].slice(0,-5);
		console.log(reqPath);

		if (pageID == 'pages') {
			response.writeHead(200, {'Content-Type' : 'application/json'});
			api.pages(function(json) {
				response.end(JSON.stringify(json, null, 4));
			});
		}

		else if (path_parts[2] == 'retrieveViews') {
			response.writeHead(200, {'Content-Type' : 'application/json'});
			api.retrieveViews(pageID, function(json) {
				response.end(JSON.stringify(json, null, 4));
			});
		}

		else if (path_parts[2] == 'retrieveUniqueUsers') {
			response.writeHead(200, {'Content-Type' : 'application/json'});
			api.retrieveUniqueUsers(pageID, function(json) {
				response.end(JSON.stringify(json, null, 4));
			});
		}

		else if (path_parts[2] == 'retrieveBrowser') {
			response.writeHead(200, {'Content-Type' : 'application/json'});
			api.retrieveBrowser(pageID, function(json) {
				response.end(JSON.stringify(json, null, 4));
			});
		}

		else if (path_parts[2] == 'retrieveLocation') {
			response.writeHead(200, {'Content-Type' : 'application/json'});
			api.retrieveLocation(pageID, function(json) {
				response.end(JSON.stringify(json, null, 4));
			});
		}

		else {
			response.writeHead(200, {'Content-Type' : 'application/json'});
			response.end({"Error": "No data available for this request."});
		}

	}
	else if (request.url.slice(0,4) == '/log') {
		traffic.record();
		response.writeHead(200, {'Content-Type' : 'text/javascript'});
		response.end("console.log('Your visit to page has been anonymously recorded.')");

	}

	else {
		filePath = 'public' + request.url;

		var absPath = './' + filePath;
		serveStatic(response, absPath);
	}
});

server.listen(3000, function() {
	console.log('Server is listening on port 3000');
});