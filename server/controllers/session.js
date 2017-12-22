const sessionModel = require("../models/session");

exports.createSession = function (req, res) {
    var session = {
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
        counsellorID: req.body.counsellorID,
        userID: req.body.userID
    };
    sessionModel.create(session, function (err) {
        if (err) {
            return res.status(422).send({error: "Failed to create session."});
        } else {
            return res.status(201).send({success: "Created a session."});
        }
    });
};

exports.counsellorGetSessions = function (req, res) {
    const counsellorID = req.params.counsellorID;
    sessonModel.listByCounsellor(counsellorID, function (err, results) {
        if (err) {
            return res.status(422).send({error: "Failed to retrieve session."});
        }

        if (!results) {
            return res.status(422).send({error: "No such sessions."});
        }

        return res.status(200).json(results);
    });
};