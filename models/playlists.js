const mongoose = require('mongoose');


const playlistSchema = mongoose.Schema({
	songs: {type: Array},
	owner: {type: Number}
});

playlistSchema.methods.apiRepr = function() {

	return {
		id: this._id,
		songs: this.songs,
		owner: this.owner
	}
}

const Playlist = mongoose.model('Playlists', playlistSchema);

module.exports = {Playlist};