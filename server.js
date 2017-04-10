var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('src/public/views'));

app.listen(process.env.PORT || 8080);

