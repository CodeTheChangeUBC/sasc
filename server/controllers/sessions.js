const Session = require('../models').Session

module.export = {
	// Create new session between user and counsellor 
	// - userId and counsellorId are user's and counsellor's ids
	// - beginTime in DATETIME type
	// Note: Upon creation endtime is null.
	create(userId, counsellorId, beginTime) {
		return Session
		.create({
			user_id: UserId,
			counsellor_id: counsellorId,
			begin_time: beginTime
		})
		.then(session => res.send(200).send(session))
		.catch(error => res.send(400).send(error));
	},

	// List all sessions involving counsellor
	// with counsellorId
	listCounsellor(counsellorId) {
		return list(counsellorId, 0);
	},

	// List all sessions involving User
	// with UserId
	listUser(userId) {
		return list(userId, 1);
	},

	// List all sessions involving User or Counsellor
	// - Arg[0] is either user or counsellor id
	// - Arg[1] is 1 if user id, 0 if counsellor id
	list(id, idType) {
		return Session
		.all()
		.filter(session => {
			// Filter based on either used id or counsellor id
			if (idType === 1) {
				return session.user_id === id;
			} else {
				return session.counsellor_id === id;
			}
		})
		.then(sessions => res.send(200).send(sessions))
		.catch(error => res.send(400).send(error));
	},


	// Delete Session with specified id
	// Destroy message with specified id
	destroy(id) {
		return Session
		.findById(id)
		.then(session => {
			if (!session) {
				// session not found
				return res.status(404).send({
					session: 'Message not Found'
				});
			}
			return session
			.destroy()
			.then(() => res.status(204).send({ message: 'Session deleted successfully.' }))
			.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},

};