var mysql = require("mysql");
var config = require("../config");
var connection;

var api = {};

dbConnection = function() {
	connection = mysql.createConnection({
		host: config.db.host,
		port: config.db.port,
		user: config.db.username,
		password: config.db.password,
		database: config.db.database
	});
}

// GET all pages added to squiggle
// /api/pages.json
api.pages = function(callback) {

	dbConnection();
	connection.connect(function(err) {
		if (err) {
			console.error("error connecting to database")
			return;
		}
	});

	var queryStr = "SELECT * FROM squiggle_pages";
	
	connection.query(queryStr, function(err, rows, fields) {
		if (err) throw err;
		var squiggle = {};
		squiggle.pages = [];
		for (var i = 0; i < rows.length; i++) {
			var page = {};
			page.pageID = rows[i].pageID;
			page.pageName = rows[i].pageName;
			page.pageURLCode = rows[i].pageURLCode;
			squiggle.pages.push(page);
		};		
		callback(squiggle);
	});

	connection.end();
	
}

// GET all page views for a page by ID
// /api/retrieveViews/{pageID}.json
api.retrieveViews = function(pageID, callback) {

	dbConnection();
	connection.connect(function(err) {
		if (err) {
			console.error("error connecting to database")
			return;
		}
	});

	var queryStr = "SELECT COUNT(*) AS views FROM squiggle_data WHERE pageID = " + pageID;
	
	connection.query(queryStr, function(err, rows, fields) {
		if (err) throw err;
		var squiggle = {};
		squiggle.views = rows[0].views;
		callback(squiggle);
	});

	connection.end();
	
}

// GET all the unique users for a page by ID
// /api/retrieveUniqueUsers/{pageID}.json
api.retrieveUniqueUsers = function(pageID, callback) {

	dbConnection();
	connection.connect(function(err) {
		if (err) {
			console.error("error connecting to database")
			return;
		}
	});

	var queryStr = "SELECT COUNT(*) AS uniqueUsers FROM squiggle_data WHERE pageID = " + pageID + " AND visitorReturn = False";
	
	connection.query(queryStr, function(err, rows, fields) {
		if (err) throw err;
		var squiggle = {};
		squiggle.uniqueUsers = rows[0].uniqueUsers;
		callback(squiggle);
	});
	
}

// GET all browsers 'user-agents' data for a page by ID
// /api/retrieveBrowser/{pageID}.json
api.retrieveBrowser = function(pageID, callback) {
	
	dbConnection();
	connection.connect(function(err) {
		if (err) {
			console.error("error connecting to database")
			return;
		}
	});

	var queryStr = "SELECT visitorBrowser, COUNT(*) AS count FROM squiggle_data WHERE pageID = " + pageID + " GROUP BY visitorBrowser";

	connection.query(queryStr, function(err, rows, fields) {
		if (err) throw err;
		var squiggle = {};
		squiggle.browsers = [];
		for (var i = 0; i < rows.length; i++) {
			var browser = {};
			browser.browser = rows[i].visitorBrowser;
			browser.views = rows[i].count;
			squiggle.browsers.push(browser);
		};		
		callback(squiggle);
	});
	
}

// GET all location data for a page by ID
// /api/retrieveLocation/{pageID}.json
api.retrieveLocation = function(pageID, callback) {
	
	dbConnection();
	connection.connect(function(err) {
		if (err) {
			console.error("error connecting to database")
			return;
		}
	});

	var queryStr = "SELECT visitorLocation, COUNT(*) AS count FROM squiggle_data WHERE pageID = " + pageID + " GROUP BY visitorLocation";

	connection.query(queryStr, function(err, rows, fields) {
		if (err) throw err;
		var squiggle = {};
		squiggle.locations = [];
		for (var i = 0; i < rows.length; i++) {
			var location = {};
			location.country = rows[i].visitorLocation;
			location.views = rows[i].count;
			squiggle.locations.push(location);
		};		
		callback(squiggle);
	});
	
}

module.exports = api;