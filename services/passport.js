const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
	//not the profile id, making use of id assigned to user from mongodb
	//to add multiple logins
	done(null, user.id);
});

passport.deserializeUser((id, done)=>{
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

passport.use(
	new GoogleStrategy(
	 {
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'	
	}, 
	async (accessToken, refreshToken, profile, done) => {
		// console.log('accessToken', accessToken);
		// console.log('refreshToken', refreshToken);
		// console.log('profile', profile);

		//Search query, returns promise
		const existingUser = await User.findOne({ googleID: profile.id })			
		if(existingUser){
			return done(null, existingUser);
		}
		// else{
		const user = await new User({ googleID: profile.id }).save()
		done(null, user);
		// .then(user => done(null, user));
			//same Model in db collection
		// }	
		// create new User
		
	}
  )
);