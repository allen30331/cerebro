const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();

//We import the playlist model
const {Playlist} = require('../models/playlists');



//Retrieves all playlists
router.get('/', function(req,res) {
	
	Playlist
		.find()
		.exec()
		.then(playlists => {
			res.json(playlists.map(playlist => playlist.apiRepr()));
		})
		.catch(function(err) {
			console.error(err);
			res.status(500).json({error: 'there was an error'});
		});
});



//Retrieves one playlist by id
router.get('/:id', function(req,res) {

	Playlist
		.findById(req.params.id)
		.exec()
		.then(playlist => res.json(playlist.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'there was an error'});
		});
})




//Creates playlist
router.post('/', function(req,res) {
	Playlist
		.create({
			songs: req.body.songs,
			owner: req.body.owner
		})
		.then(playlistEntry => res.status(201).json(playlistEntry.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({error: 'there was an error'})
		});
});



//Updates playlist by id
router.put('/:id', function(req,res) {

	const toUpdate = {};
	const updateableFields = ['songs', 'owner'];




	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}

		Playlist
			.findByIdAndUpdate(req.params.id, {$set: toUpdate})
			.exec()
			.then(playlist => res.status(204).end())
			.catch(err => res.status(500).json({message: 'there was an error'}));
	});
});



//Deletes playlist by id
router.delete('/:id', function(req,res) {

	Playlist
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(playlist => res.status(204).end())
		.catch(err => res.status(500).json({message: 'there was an error'}));
});




module.exports = router;