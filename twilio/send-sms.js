// Twilio Credentials 
var accountSid = 'AC049ba6d691d6a63674ebcd7a9caa433d'; 
var authToken = '5789dbba242d79b808d45b68e6752354'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
    to: "+16042504126", 
    from: "+16042657509", 
    body: "Test message from twilio account", 
}, function(err, message) { 
    if (err) {
    	console.log("DIDN'T WORK"); 
    }
});