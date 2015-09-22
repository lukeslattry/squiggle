var traffic_recorder = {};
var mysql = require("mysql");
var config = require("../config");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "squiggle"
});

function geoLocate(IP) {
	// coming soon...
}

traffic_recorder.record = function(pageID, date, IP, geoLocation, browserType, returnUser) {
	// coming soon...
}

module.exports = traffic_recorder;