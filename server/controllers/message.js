const messageController = require("../models/message");

exports.addMessage = function (req, res) {
    var message = {
        chatroomID: req.body.chatroomID,
        sessionID: req.body.sessionID,
        messageTime: req.body.messageTime,
        counsellorID: req.body.counsellorID,
        userID: req.body.userID,
        messageContent: req.body.messageContent,
        fromCounsellor: req.body.fromCounsellor,
        fromTwilio: req.body.fromTwilio
    };
    messageController.create(message, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to store message."});
        } else {
            return res.status(201).send({success: "Created a message."});
        }
    });
};

exports.getMessages = function (req, res) {
    const chatroomID = req.params.chatroomID;
    messageController.listByChatroom(chatroomID, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve messages."});
        }

        return res.status(200).json(results);
    });
};