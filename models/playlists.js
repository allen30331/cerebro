const mongoose = require('mongoose');

//We define how our collection data should look.
const playlistSchema = mongoose.Schema({
	songs: {type: Array},
	owner: {type: Number}
});


//This gives each instance of our Playlist model an apiRepr method, 
//which we will use as the standard way of representing 
//users in our API. Instead of simply passing along the underlying 
//document itself, we'll pass along this composite data.
playlistSchema.methods.apiRepr = function() {

	return {
		id: this._id,
		songs: this.songs,
		owner: this.owner
	}
}

//Instantiates our playlist model.
const Playlist = mongoose.model('Playlists', playlistSchema);

module.exports = {Playlist};