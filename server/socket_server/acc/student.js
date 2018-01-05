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
    if (!this.convo) {
      return
    }

    this.convo.counsellor.emit('msg', data)
  }

  connect () {
    var counsellor = super.find(this)
  }

  listen () {
    var self = this
    var socket = this._socket

    socket.on('msg', onMessage)
  }
}

module.exports = User