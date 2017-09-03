const User = require('../models').User;

module.exports = {
	// Create user with params specified in request
	create(req,res) {

		// testing, remove when done ----------
		console.log('registering', req.body);
		// ------------------------------------

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

	// List all Users
	list(req,res) {
		return User
		.all()
		.then(users => res.status(200).send(users))
		.catch(error => res.status(400).send(error));
	},

	// Retrieve User with id specified in request
	retrieve(req,res) {

		// testing, remove when done ----------
		console.log('retrieving', req.body);
		// ------------------------------------

		return User
		.findById(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "User Not Found"
				});
			}
			return res.status(200).send({ 'user': user });
		});
	},

	// Update User with id specified in request
	update(req, res) {
		return User
		.findById(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'User Not Found',
				});
			}
			return user
			.update({
				age: req.body.age || user.age,
				gender: req.body.gender || user.gender,
				number: req.body.number || user.number,
				password: req.body.password || user.password,
			})
			// Send updated user
			.then(() => res.status(200).send({'user': user}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
	},

	// Destroy user with id specified in request
	destroy(req, res) {
		return User
		.findById(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(400).send({
					message: 'User Not Found',
				});
			}
			return user
			.destroy()
			.then(() => res.status(204).send({ message: 'User deleted successfully.' }))
			.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},
};