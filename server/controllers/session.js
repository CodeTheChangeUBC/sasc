const sessionModel = require("../models/session");
const to = require("await-to-js").to;

exports.createSession = async function (req, res) {
    var session = {
        beginTime: req.body.beginTime,
        endTime: req.body.endTime,
        counsellorID: req.body.counsellorID,
        userID: req.body.userID
    };

    var err, results;
    [err, results] = await to(sessionModel.create(session));

    if (err) {
        return res.status(422).send({error: "Failed to create session."});
    }

    if (results.changedRows === 0) {
        return res.status(422).send({error: "Cannot create session."});
    }
        
    return res.status(201).send({success: "Created a session."});
};

exports.counsellorGetSessions = async function (req, res) {
    const counsellorID = req.params.counsellorID;
    var err, results;
    [err, results] = await to(sessionModel.listByCounsellor(counsellorID));
    if (err) {
        return res.status(422).send({error: "Failed to retrieve session."});
    }

    if (!results) {
        return res.status(422).send({error: "No such sessions."});
    }

    return res.status(200).json(results);
};