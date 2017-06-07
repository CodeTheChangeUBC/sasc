
const ADMIN = 'ADMIN'
const USER = 'USER'

var Users = {}
var Conversations = {}



function Listen (socket) {
  socket.on('account', data => {
    // We need soms sort of verification plan here.
    // Perhaps tokens?
    Users[socket.id].type = data
  })

  socket.on('msg', data => {
    if (Users[socket.id].type == ADMIN) {

    } else {

    }
  })

  socket.on('disconnect', data => {
    Alert(Conversations[socket.id])
    delete Users[socket.id]
  })
}


function Handle (io) {
  io.on('connection', socket => {
    // When the user enters, add listeners for the socket.
    Listen(socket)
    // Create a simple profile, to be added to later.
    Users[socket.id] = {
      socket: socket,
      type: null
    }
  })

}
module.exports = Handle