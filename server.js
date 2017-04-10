var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, function() {
	console.log('Your app is listening to port 8080')
});

