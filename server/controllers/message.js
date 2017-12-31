const messageModel = require("../models/message");

exports.addMessage = function (req, res) {
    var message = {
        sessionID: req.body.sessionID,
        messageTime: req.body.messageTime,
        counsellorID: req.body.counsellorID,
        userID: req.body.userID,
        messageContent: req.body.messageContent,
        fromCounsellor: req.body.fromCounsellor,
        fromTwilio: req.body.fromTwilio
    };
    messageModel.create(message, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to store message."});
        } else {
            return res.status(201).send({success: "Created a message."});
        }
    });
};

exports.getMessages = function (req, res) {
    const sessionID = req.params.sessionID;
    messageModel.listBySession(sessionID, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve messages."});
        }

        return res.status(200).json(results);
    });
};
