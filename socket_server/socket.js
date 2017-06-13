// This is the main socket server.
// It has 2 roles:
// 
// 1) Broker conselor-student connections.
// 2) Verify that incoming connections are legitimate.
// 
// Communication between sockets is done in User objects themselves.

var Counselor = require('./acc/counselor')
var Student = require('./acc/student')


function Handler (socket) {
  
}


module.exports = Handler
