var pg = require('pg');
// -----------------------------------------------------------------------------------
var connectionInfo = {
  host: 'testingdb.cyvtd9al5nwa.eu-central-1.rds.amazonaws.com',
  port: 5432,
  user: 'testAdmin',
  password: 'testPass9',
  database: 'testingdb',
  ssl: {}
};
// -----------------------------------------------------------------------------------
var db = {};
// -----------------------------------------------------------------------------------
db.connect = function(callback){
	pg.connect(connectionInfo, function(err, client, done){
		if (err) console.log('ERROR --> db.connect: ', err);
		callback(client, done);
	})
}
// -----------------------------------------------------------------------------------
db.query = function(req, res, args){
	db.connect(function(client, done){
		var query = client.query(args.query);
		var result = [];
		query.on('row', function(row){
			result.push(row);
		}); // Populate the 'result' array with each matching tuple object
		query.on('end', function(){
			if (callback){ // Pass along the 'result' array
				callback(req, res, args, result)
			} else { // If no callback
				res.status(200).send('OK');
			}
			client.end();
		})
	})
}
// -----------------------------------------------------------------------------------
db.insert = function(req, res, args){
	// ARGS: {name: itsname, value: itsvalue}
	var columnNames = [], entryValues = [];
	for (var i in args.values){
		columnNames.push(i);
		entryValues.push(args.values[i]);
	}
	var queryString = 'INSERT INTO modelobjects (name, value) VALUES (' + entryValues.join(', ') + ')';
	db.query(req, res, {query: queryString});
}
// -----------------------------------------------------------------------------------
module.exports = db;