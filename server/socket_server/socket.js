// This is the main socket server.
// It has 2 roles:
// 
// 1) Verify that incoming connections are legitimate.
// 2) Create the appropriate students and counsellors.
// 
// Communication between sockets is done in User objects themselves.

import config from '../../config'
import User from './acc/user'
import jwt from 'jsonwebtoken'

module.exports = io => {
    
    // Check and accept/reject connection based on token.
    io.use((socket, next) => {
        var token = socket.request.query.token
        var secret = config.secret

        // Verify and decode the token.
        jwt.verify(token, secret, (error, data) => {
            if (error) {
                next(error)
            } else {
                socket.payload = data
                next()
            }
        })
    })


    // Create a user for this socket.
    // Set up listeners for this socket.
    io.on('connection', socket => {
        var req = socket.request
        console.info(`Socket connection: IP ${req.connection.remoteAddress}`)

        User.add(socket)
    })
}
