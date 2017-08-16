var SQLDbAccessor = (function () {
    function SQLDbAccessor() {
        vvar MySQLCredentials = require("./mysqlCredentials");
        var credentials = new MySQLCredentials();

        var mysql = require("mysql");
        var connection = mysql.createConnection({
            host: credentials.mysqlHost,
            user: credentials.mysqlUser,
            password: credentials.mysqlPassword,
            database: credentials.mysqlDb
        });
    }

    SQLDbAccessor.prototype.getUserIDByPhoneNumber = function (phoneNumber, callback) {
        SQLDbAccessor.connection.connect();
        SQLDbAccessor.connection.query("SELECT ID FROM user WHERE phoneNumber = " + toNumber + ";", function (error, results, fields) {
            if (err || results == null) {
                callback(null);
            } else {
                callback(results);
            }
        });
        SMSServer.connection.end();
    }
    

    
    return SQLDbAccessor;
}());
module.exports = SQLDbAccessor;
