const db = require("./../db.js");
const abstract = require("./abstract.js");

// Create session
exports.create = function (values, callback) {
    abstract.createCallbackVer('chatroom', values, callback)
};

// List all the chatrooms of a given counsellor 
exports.listByCounsellor = function (counsellorID, callback) {
    abstract.listByForeignKey('chatroom', 'counsellorID', counsellorID, callback);
};

// Retrieve by user ID
exports.listByUser = function(userID, callback) {
    abstract.listByForeignKey('chatroom', 'userID', userID, callback);
}