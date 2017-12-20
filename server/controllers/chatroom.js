const chatroomModel = require("../models/chatroom");

exports.createChatroom = function (req, res) {
    var chatroom = {
        counsellorID: req.body.counsellorID,
        userID: req.body.userID
    };
    chatroomModel.create(chatroom, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to create chatroom."});
        } else {
            return res.status(201).send({success: "Created a chatroom."});
        }
    });
};

exports.counsellorGetChatrooms = function (req, res) {
    const counsellorID = req.params.counsellorID;
    chatroomModel.listByCounsellor(counsellorID, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve chatroom."});
        } else if (!results[0]) {
            return res.status(404).send({error: "No such chatrooms."});
        }
        return res.status(200).json(results);
    });
};

exports.userGetChatroom = function (req, res) {
    const userID = req.params.userID;
    chatroomModel.listByUser(userID, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve chatroom."});
        } else if (!results[0]) {
            return res.status(404).send({error: "No such chatrooms."});
        } else {
            return res.status(200).json(results[0]);
        }
    });
};