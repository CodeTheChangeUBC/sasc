// This is the main socket server.
// It has 2 roles:
// 
// 1) Verify that incoming connections are legitimate.
// 2) Create the appropriate students and counselors.
// 
// Communication between sockets is done in User objects themselves.

var users = require('./acc/users') 

var util = require('./secrets')
var jwt = require('jsonwebtoken')

module.exports = io => {

  // Check and accept/reject connection based on token.
  io.use((socket, next) => {
    var token = socket.request.query.t
    var secret = util.secret

    // Verify and decode the token.
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        next(error)
      } else {
        socket.data = data
        next()
      }
    })
  })


  // Create a user for this socket.
  // Set up listeners for this socket.
  io.on('connection', socket => {
    var user = users.create(socket)

    // Sends the msg, to the appropriate user.
    // i.e.
    //  Counsellor <-> Student
    socket.on('msg', data => (user.relay(data))
  })
}
