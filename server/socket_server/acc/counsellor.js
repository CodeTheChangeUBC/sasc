var uuid = require('uuid')
var User = require('./user')

class Counsellor extends User {
  constructor (socket) {
    super(socket, 'Counsellor', this)

    this._socket = socket
    this.id = socket.id

    this.conversations = {}

    listen()
  }

  /**
   * Sends the data to the appropriate student conversation
   * @param  {JSON} data - contains conversation id and data
   */
  onMessage (data) {
    this.conversations[data.convoId].socket.emit('msg', data.msg)
  }

  /**
   * Sets up the listeners for the socket this counselor is connect to.
   */
  listen () {
    var self = this
    var socket = this._socket

    socket.on('msg', onMessage)
  }
}



module.exports = Counsellor