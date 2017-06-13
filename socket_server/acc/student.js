var User = require('./user')

class Student extends User {
  constructor (socket) {
    super(socket, 'Student', this)

    this.convo = null
    this._socket = socket
    this.id = socket.id

    connect()
    listen()
  }

  onMessage (data) {
    this.conversation
  }

  connect () {
    this.convo = super.find(this)
  }

  listen () {
    var self = this
    var socket = this._socket

    socket.on('msg', onMessage)
  }
}

module.exports = User
