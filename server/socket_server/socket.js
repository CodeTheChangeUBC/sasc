// This is the main socket server.
// It has 2 roles:
// 
// 1) Verify that incoming connections are legitimate.
// 2) Create the appropriate students and counsellors.
// 
// Communication between sockets is done in User objects themselves.

var Counsellor = require('./acc/counsellor');
var Student = require('./acc/student');
//var users = require('./acc/users') 

var util = require('./../../config');
var jwt = require('jsonwebtoken');

module.exports = io => {

  // Check and accept/reject connection based on token.
  io.use((socket, next) => {
    var token = socket.request.query.t;
    var secret = util.secret;

    // Verify and decode the token.
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        next(error);
      } else {
        socket.data = data;
        next();
      }
    });
  });


  // Create a user for this socket.
  // Set up listeners for this socket.
  io.on('connection', socket => {
    switch (socket.payload.type) {
      case 'COUNSELLOR':
        console.log('Counsellor connected!');
        new Counsellor(socket);
      break;
      case 'STUDENT':
        console.log('Student connected!');
        new Student(socket);
      break;
    }
    
    //var user = users.create(socket)

    // Sends the msg, to the appropriate user.
    // i.e.
    //  Counsellor <-> Student
    //socket.on('msg', data => (user.relay(data))
  });
};
