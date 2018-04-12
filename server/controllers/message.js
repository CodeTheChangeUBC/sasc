const messageModel = require("../models/message");
const to = require("await-to-js").to;

exports.addMessage = async function (req, res) {
    var message = {
        sessionID: req.body.sessionID,
        messageTime: req.body.messageTime,
        counsellorID: req.body.counsellorID,
        userID: req.body.userID,
        messageContent: req.body.messageContent,
        fromCounsellor: req.body.fromCounsellor,
        fromTwilio: req.body.fromTwilio
    };

    let err, results;
    [err, results] = await to(messageModel.create(message));
    
    if (err) {
        return res.status(422).send({error: "Failed to store message."});
    }

    if (results.changedRows === 0) {
        return res.status(422).send({error: "Cannot create message."});
    }

    return res.status(201).send({success: "Created a message."});
};

exports.getMessages = async function (req, res) {
    const sessionID = req.params.sessionID;
    let err, results;
    [err, results] = await to(messageModel.listBySession(sessionID));
    if (err) {
        return res.status(422).send({error: "Failed to retrieve messages."});
    }

    if (!results) {
        return res.status(422).send({error: "Cannot get message."});
    }

    return res.status(200).json(results);
};
