const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	playlists: {type: Array}
});


userSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		lastName: this.lastName,
		email: this.email,
		password: this.password,
		playlists: this.playlists
	}
}

const User = mongoose.model('Users', userSchema);

module.exports = {User};