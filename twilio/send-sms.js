import { stephNumber, stephTwilioNumber, stephAuthToken, stephAccountSid } from './twilioCredentials';
const twilios = require('./models/twilios').twilio;

export default class SendSMS {
	constructor() {
		super(accountSid, authToken);
		this.accountSid = stephAccountSid;
		this.authToken = stephAuthToken;
		//require the Twilio module and create a REST client
		this.client = require('twilio')(accountSid, authToken);
	}

	/**
		Sends message from Twilio number to SMS number.
		Messages get stored to our database.
	**/
	sendMessageToSMS(obj, toNumber, fromNumber, body) {
		obj.client.messages.create({
		    to: stephNumber,
		    from: stephTwilioNumber,
		    body: body,
		}, function(err, message) {
		    if (err) {
		    	console.log("DIDN'T WORK");
		    }
		    console.log(message.sid);
				// TODO: Add message to database.
				twilios.update("example@example.com", fromNumber, obj.accountSid, obj.authToken);
		});
	}

	/**
		Returns: a list of message objects for a specific contact
	**/
	listMessagesForContact(obj, contactNumber) {
		var result = obj.client.messages.list(function(err, data) {
			var messages = [];
			data.messages.forEach(function(message) {
				console.log(message.body);
				if (message.to === contactNumber || message.from === contactNumber)
					messages.push(message);
			});
			return messages;
		});
		return result;
	}
}
