const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	googleID: String,
	name: String
});

//Create a new collection called users
// const User = 
mongoose.model('users', userSchema);
// module.exports = User;


