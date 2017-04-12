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
});


router.get('/:id', function(req,res) {

	User
		.findById(req.params.id)
		.exec()
		.then(users => res.json(users.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'there was an error'});
		});
})


router.post('/', function(req,res) {
	User
		.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			playlists: req.body.playlists
		})
		.then(userEntry => res.status(201).json(userEntry.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'there was an error'})
		});
});



router.put('/:id', function(req,res) {

	const toUpdate = {};
	const updateableFields = ['firstName', 'lastName', 'email', 'password', 'playlists']

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}

		User
			.findByIdAndUpdate(req.params.id, {$set: toUpdate})
			.exec()
			.then(user => res.status(204).end())
			.catch(err => res.status(500).json({message: 'there was an error'}));
	});
});


module.exports = router;