const User = require('../models').User;

module.exports = {
	create(req,res) {
		return User
		.create({
			age: req.body.age,
			gender: req.body.gender,
			number: req.body.number,
			password: req.body.password,
		})
		.then(user => res.status(201).send(user))
		.catch(error => res.status(400).send(error));
	},
};