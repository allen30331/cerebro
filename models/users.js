const mongoose = require('mongoose');

//We define how our collection data should look. 
const userSchema = mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	playlists: {type: Array}
});


//This gives each instance of our User model an apiRepr method, 
//which we will use as the standard way of representing 
//users in our API. Instead of simply passing along the underlying 
//document itself, we'll pass along this composite data.
userSchema.methods.apiRepr = function() {
	return {
		id: this._id,
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		password: this.password,
		playlists: this.playlists
	}
}

//Instantiates our User model.
const User = mongoose.model('Users', userSchema);

module.exports = {User};