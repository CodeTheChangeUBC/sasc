

var Patient = require('./patient')


class User {

  /**
   * Creates a user based on the socket.data data.
   * @param  {Socket} socket - The Socket.io socket.
   * @return {User}          - Returns a user either a counselor or patient.
   */
  static create (socket) {
    var user

    switch (socket.data.type) {
      case 'COUNSELOR':
        user = new Counselor(socket)
      break
      case 'PATIENT':
        user = new Patient(socket)
      break
    }

    // Add it to the global map.
    this.users[socket.id] = user

    return user
  }
}

User.users = {}



module.exports = User