// This is the main socket server.
// It has 2 roles:
// 
// 1) Broker conselor-student connections.
// 2) Verify that incoming connections are legitimate.
// 
// Communication between sockets is done in User objects themselves.

var Counselor = require('./acc/counselor')
var Student = require('./acc/student')

var util = require('./secrets')
var jwt = require('jsonwebtoken')

function Handler (io) {
  // Middleware to verify the token.
  io.use((socket, next) => {
    jwt.verify(socket.request.query.t, util.secret, (err, data) => {
      if (err) {
        next(new Error('Auth Error: Invalid Token'))
        return
      }
      next(data)
    })
  })
}


module.exports = Handler
