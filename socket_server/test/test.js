// Pre-req: Socket Server should already be running.
var assert = require('assert')
var io_client = require('socket.io-client')

// Build some tokens later.
const AUTH_TOKENS = [
    '..'
]

describe('connection', n => {
    var socket

    // Select a random token and make a socket connection
    before(n => {
        var token = AUTH_TOKENS[~~(Math.random() * AUTH_TOKENS)]
        socket = io_client(`http://localhost?t=${token}`)
    })

    // Check that a basic echo works on this connection.
    it('should send echo fine.', done => {
        const orig = 'JOE THOMAS IS AMAZING!!! 420 YOLO... SWAG SWAG'

        socket.once('echo', msg => {
            assert(msg).equal(orig)
            done()
        })
    })
})








