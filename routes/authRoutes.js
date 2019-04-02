const passport = require('passport');
const express = require('express');

module.exports = (app)=> {
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
		scope: ['profile', 'email']
	  })
	);

	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/SmartTravel');
		}	
		);

	app.get('/api/logout', (req, res)=>{
		req.logout();
		// res.send(req.user);
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});


};