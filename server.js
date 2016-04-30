var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'db154.pair.com',
   user: 'ment2_17',
   password: 'gJ9yG2Zc',
   database: 'ment2_team2'
});

connection.connect(function(err) {
   if (err) throw err;
});

// Sets up the Express App

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Tables
var tables = [

	{
		name: "Bilal",
		phonenumber: 123456789,
		email: "bilalj.mian@gmail.com",
		uniqueID: 1
	}

];

var waitlist = [

	{
		name: "Late McGee",
		phonenumber: 123456789,
		email: "latemcgee@gmail.com",
		uniqueID: 1
	}
]

//Routes
//===========================================================
app.get('/', function(req, res){
	
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/reserve', function(req, res){
	
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/reserve.html'));
})

app.get('/tables', function(req, res){
	
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/tables.html'));
})

app.get('/api/tables', function(req, res){

	var chosen = req.params.tables;

	if(chosen){
		console.log(chosen);

		for (var i=0; i <tables.length; i++){

			if (chosen == tables[i].routeName){
				res.json(tables[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(tables);
	}
})

app.get('/api/waitlist', function(req, res){

	var chosen = req.params.waitlist;

	if(chosen){
		console.log(chosen);

		for (var i=0; i <waitlist.length;  i++){

			if (chosen == waitlist[i].routeName){
				res.json(waitlist[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(waitlist);
	}
})

// Create New Characters - takes in JSON input
app.post('/api/reservation', function(req, res){

	// req.body hosts is equal to the JSON post sent from the user
	var newreservation = req.body;

	console.log(newreservation);

	// We then add the json the user sent to the character array
	tables.push(newreservation);

	// We then display the JSON to the users
	res.json(newreservation);
})

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})