const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();

//We import the user model
const {User} = require('../models/users');


//Retrieves all users
router.get('/', function(req,res) {
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


//Retrieves one user by id
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


//Creates user
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


//Updates user by id
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


//Deletes user by id
router.delete('/:id', function(req,res) {

	User
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(user => res.status(204).end())
		.catch(err => res.status(500).json({message: 'there was an error'}));
});


module.exports = router;