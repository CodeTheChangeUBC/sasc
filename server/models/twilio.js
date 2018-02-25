var store = require("./../../config");

exports.getSMSFields = function () {
	return store.sms;
};

exports.changeSMSFields = function (values) {
	store.sms.email = values.email;
	store.sms.twilioPhoneNumber = values.twilioPhoneNumber;
	store.sms.accountSid = values.accountSid;
	store.sms.authToken = values.authToken;
};

exports.deleteSMSFields = function () {
	store.sms.email = "";
	store.sms.twilioPhoneNumber = "";
	store.sms.accountSid = "";
	store.sms.authToken =  "";
};