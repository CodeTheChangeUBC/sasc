const Counsellor = require('../models').Counsellor;

module.exports = {
	create(req,res) {
		return Counsellor
		.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
		})
		.then(counsellor => res.status(201).send(counsellor))
		.catch(error => res.status(400).send(error));
	},
};