var traffic_recorder = {};
var mysql = require("mysql");
var geoip = require('geoip-lite');
var config = require("../config");

dbConnection = function() {
	connection = mysql.createConnection({
		host: config.db.host,
		port: config.db.port,
		user: config.db.username,
		password: config.db.password,
		database: config.db.database
	});
}

traffic_recorder.record = function(pageID, request, response) {

	dbConnection();
	connection.connect(function(err) {
		if (err) {
			console.error("error connecting to database")
			return;
		}

		else {
			var ip = request.connection.remoteAddress;
			var geo = geoip.lookup(ip);
			var queryStr;

			if (!geo) {
				queryStr = "INSERT INTO squiggle_data VALUES (" + pageID + ", CURRENT_DATE, '" + ip + "', 'Unknown')";
			}

			else {
				queryStr = "INSERT INTO squiggle_data VALUES (" + pageID + ", CURRENT_DATE, \'" + ip + "'," + geo.country +")";
			}

			connection.query(queryStr, function(err, rows, fields) {
				if (err) throw err;
			});
		}
	});
}

module.exports = traffic_recorder;