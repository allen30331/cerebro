'use strict';

//instantiates express within a variable
const express = require('express');
//provides utilities for working with file and directory paths.
const path = require('path');
//instantiates express with the variable app
const app = express();

// body-parser extracts the entire body portion of an incoming request 
//stream and exposes it on req.body as something easier to interface with.
const bodyParser = require('body-parser');

//instantiates morgan for http logging
const morgan = require('morgan');

//instantiates mongoose library to interact with mongo database. 
const mongoose = require('mongoose');

 
const usersRouter = require('./routes/usersRouter');

const playlistsRouter = require('./routes/playlistsRouter');

//We import the database_url and port from the config file
const {DATABASE_URL, PORT } =  require('./config/config');

//tells express which folder to serve static files from
app.use(express.static('public'));

//common format gives us standard Apache server style logging.
app.use(morgan('common'));

// we tell express to use the bodyParser.json middleware. 
// This provides support for parsing of application/json type post data. 
app.use(bodyParser.json());

//allows to use promises when interacting with 
//database. We can use methods like, exec(), then().
mongoose.Promise = global.Promise; 

//When a request is made to the "users" end point it will be routed
//to the userRouter file and handled there.
app.use('/users', usersRouter);

//When a request is made to the "playlists" end point it will be routed
//to the playlistsRouter file and handled there.
app.use('/playlists', playlistsRouter);


// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server; 




//runServer is responsible for coordinating 
//both the connection to the database, and the running of the HTTP server. 
//First you use Mongoose to connect to the database
//using the URL from config.js.
//Then you listen for new connections on the configured port. 
//If all of that was successful, then you call an optional callback function 
//to signal that everything is up and running.
function runServer(databaseUrl) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			console.log(databaseUrl);
			if (err) {
				return reject(err);
			}
			server = app.listen(PORT, () => {
				console.log('Your app is listening on port ${PORT}');
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}



// closeServer function that is responsible for disconnecting 
//from the database and closing down our app. 
function closeServer() {
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close(err => {
			if (err) {
				//so we don't also call `resolve()`
				return;
			}
			resolve();
		});
	});
}

//makes this file both an executable script, and a module. 
//If the script is run directly (node server.js) 
//then the runServer function will be called. 
//But if the file is included from somewhere else (require('./server')) 
//then the function won't be called, 
//allowing the server to be started at a different point 
//(this will be useful when we need to execute the runServer function 
//before each test in our test suites).
if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}

//We export these functions and values so they
//can be accessed elsewhere.
module.exports = {app, runServer, closeServer};