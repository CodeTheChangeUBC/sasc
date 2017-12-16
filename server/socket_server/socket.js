// This is the main socket server.
// It has 2 roles:
// 
// 1) Verify that incoming connections are legitimate.
// 2) Create the appropriate students and counsellors.
// 
// Communication between sockets is done in User objects themselves.

var Counsellor = require('./acc/counsellor')
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
      socket.payload = data
      next()
    })
  })


  // On a connection, create the appropriate user object.
  io.on('connection', socket => {
    switch (socket.payload.type) {
      case 'COUNSELLOR':
        console.log('Counsellor connected!')
        new Counsellor(socket)
      break
      case 'STUDENT':
        console.log('Student connected!')
        new Student(socket)
      break
    }
  })
}


module.exports = Handler
