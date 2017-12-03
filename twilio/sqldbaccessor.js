"use strict";
var SQLDbAccessor = (function () {
    function SQLDbAccessor() {}

    var createConnection = function () {
        var mysql = require("mysql");
        var MySQLCredentials = require("./mysqlCredentials");
        var credentials = new MySQLCredentials();
        return mysql.createConnection({
            host: credentials.mysqlHost,
            user: credentials.mysqlUser,
            password: credentials.mysqlPassword,
            database: credentials.mysqlDb
        });
    };

    SQLDbAccessor.prototype.getUserIDByPhoneNumber = function (phoneNumber, callback) {
        var connection = createConnection();
        connection.connect(function (error) {
            if (error) {
                throw error;
            }
            connection.query("SELECT ID FROM user WHERE phoneNumber = " + phoneNumber + ";", function (error, results) {
                if (error || results === null || results === undefined) {
                    callback(null);
                } else {
                    callback(results);
                }
            });
        });
        connection.end();
    };

    SQLDbAccessor.prototype.createTwilio = function (email, twilioPhoneNumber, accountSid, authToken, callback) {
        var connection = createConnection();
        connection.connect(function (error) {
            if (error) {
                throw error;
            }
            connection.query(
                "INSERT INTO twilio (email, twilioPhoneNumber, accountSid, authToken) VALUES (" + email + ", " + twilioPhoneNumber + ", " + accountSid + ", " + authToken + ");",
                function (error, results) {
                    if (error || results === null || results === undefined) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                }
            );
        });
        connection.end();
    };

    SQLDbAccessor.prototype.getTwilio = function (callback) {
        var connection = createConnection();
        connection.connect(function (error) {
            if (error) {
                throw error;
            }
            connection.query("SELECT * FROM twilio;", function (error, results) {
                if (error || results === null || results === undefined) {
                    callback(null);
                } else {
                    callback(results);
                    console.log(results);
                }
            });
        });
        connection.end();
    };

    SQLDbAccessor.prototype.deleteTwilio = function (email, callback) {
        var connection = createConnection();
        connection.connect(function (error) {
            if (error) {
                throw error;
            }
            connection.query("DELETE FROM twilio WHERE email=" + email + ";", function (error, results) {
                if (error || results === null || results === undefined) {
                    callback(null);
                } else {
                    callback(results);
                    console.log("deleted " + results.affectedRows + " rows");
                }
            });
        });
        connection.end();
    };

    return SQLDbAccessor;

}());
module.exports = SQLDbAccessor;
