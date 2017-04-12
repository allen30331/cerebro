const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();

const {User} = require('../models/users');


router.get('/', function(req,res) {
	console.log('hello');
	User
		.find()
		.exec()
		.then(users => {
			res.json(users.map(user => user.apiRepr()));
		})
		.catch(function(err) {
			console.error(err);
			res.status(500).json({error: 'there was an error'});
		});
})



module.exports = router;