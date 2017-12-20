const chatroomController = require("../models/chatroom");

exports.createChatroom = function (req, res) {
    var chatroom = {
        counsellorID: req.body.counsellorID,
        userID: req.body.userID
    };
    chatroomController.create(chatroom, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to create chatroom."});
        } else {
            return res.status(201).send({success: "Created a chatroom."});
        }
    });
};

exports.counsellorGetChatrooms = function (req, res) {
    const counsellorID = req.params.counsellorID;
    chatroomController.listByCounsellor(counsellorID, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve chatroom."});
        }

        if (!results) {
            return res.status(404).send({error: "No such chatrooms."});
        }
        return res.status(200).json(results);
    });
};