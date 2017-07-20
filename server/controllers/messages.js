const Message = require('../models').Message;

module.exports = {
	// Create Message with specified time and content
	// - time is DATETIME type
	// - content is string type
	create(time, content, userid, sessionid, counsellorid) {
		return Message
		.create({
			message_time = time;
			content = content;
			user_id = userid;
			session_id = sessionid;
			counsellor_id = counsellorid;
		})
		//success
		.then(message => res.send(201).send(message))
		//error
		.catch(error => res.status(400).send(error))
	},

	// List all messages based on users id
	list(user_id) {
		return Message
		.all()
		// filter all messages based on user_id
		.filter(message => {
			return message.user_id === user_id;
		})
		.then(messages => send.status(200).send(messages))
		.catch(error => send.status(400).send(error));
	},

	// Destroy message with specified id
	destroy(id) {
		return Message
		.findById(id)
		.then(message => {
			if (!message) {
				// message not found
				return res.status(404).send){
					message: 'Message not Found'
				});
			}
			return message
			.destroy()
			.then(() => res.status(204).send({ message: 'Message deleted successfully.' }))
			.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},
};