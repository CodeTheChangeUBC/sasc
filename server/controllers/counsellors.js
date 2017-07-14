const Counsellor = require('../models').Counsellor;

module.exports = {
	// Create a new Counsellor
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

	// List all Counsellors
	list(req,res) {
		return Counsellor
		.all()
		.then(counsellors => res.status(200).send(counsellors))
		.catch(error => res.status(400).send(error));
	},

	// Retrieve Counsellor with id specified in request
	retrieve(req,res) {
		return Counsellor
		.findById(req.params.counsellorId)
		.then(counsellor => {
			if (!counsellor) {
				// Counsellor doesn't exist
				return res.status(404).send({
					message: 'Counsellor Not Found',
				});
			}
			return res.status(200).send(counsellor);
		})
		.catch(error => res.status(404).send(error));
	},

	// Update Counsellor with id specified in request
	update(req, res) {
		return Counsellor
		.findById(req.params.counsellorId)
		.then(counsellor => {
			if (!counsellor) {
				// Counsellor doesn't exist
				return res.status(404).send({
					message: 'Counsellor Not Found',
				});
			}
			return counsellor
			.update({
				first_name: req.body.first_name || counsellor.first_name,
				last_name: req.body.last_name || counsellor.last_name,
				email: req.body.email || counsellor.email,
				password: req.body.password || counsellor.password,
			})
			// Send updated counsellor
			.then(() => res.status(200).send(counsellor))
			.catch((error) => res.status(400).send(counsellor));
		})
		.catch((error) => res.status(400).send(error));
	},

	// Destroy counsellor with id specified in request
	destroy(req, res) {
		return Counsellor
		.findById(req.params.counsellorId)
		.then(counsellor => {
			if (!counsellor) {
				// Counsellor doesn't exist
				return res.status(404).send({
					message: 'Counsellor Not Found',
				});
			}
			return counsellor
			.destroy()
			.then(() => res.status(204).send({ message: 'Counsellor deleted successfully.' }))
			.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},
};