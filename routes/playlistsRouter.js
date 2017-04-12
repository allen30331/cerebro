const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jasonParser = bodyParser.json();

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






module.exports = router;