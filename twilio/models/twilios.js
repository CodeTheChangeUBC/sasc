const Twilio = require('../../server/models').Twilio;

module.exports {
	// Create Twilio from form input
	create(req,res) => {
		return Twilio
		.create({
			email = req.body.email;
			phoneNumber = req.body.phoneNumber;
			accountSid = req.body.accountSid;
			authToken = req.body.authToken;
		})
		.then(twilio => res.status(200).send(twilio))
		.catch(error => res.status(400).send(error))
	},

	// Update Twilio from form input
	update(req,res) => {
		return Twilio
		.findById(req.params.twilioId)
		.then (twilio {
			if (!twilio) {
				return res.status(404).send({
					message: "Not found",
				});
			}
			return twilio
			.update({
				email = req.body.email || twilio.email;
				phoneNumber = req.body.phoneNumber || twilio.phoneNumber;
				accountSid = req.body.accountSid || twilio.accountSid;
				authToken = req.body.authToken || twilio.authToken;		
			})
			.then(twilio => res.status(200).send(twilio))
			.catch(error => res.status(400).send(error))
		})
		.catch(error => res.status(400).send(error))
	},

};