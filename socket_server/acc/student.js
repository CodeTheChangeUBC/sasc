var User = require('./user')

class Student extends User {
  constructor (socket) {
    super(socket)
  }
}

module.exports = User
