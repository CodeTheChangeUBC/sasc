var User = require('./user')

class Counselor extends User {
  constructor (socket) {
    this.socket = socket
    this.id = socket.id

    this.conversations = []
    this.conversationMap = {}

    AdminMap[socket.id] = this
  }

  static send (id, data) {
    AdminMap[id].socket.emit('msg', data)
  }

  static disconnect (id, user) {
    AdminMap[id].socket.emit('dead', user.toString())
  }
}



module.exports = Counselor
