
import User from './user'


class Counsellee extends User {

    constructor (socket) {
        super(socket)
        super.match(socket)

        socket.on('msg', this.onMessage)

    }

    onMessage (msg) {

    }


    socket () {
        return this._socket
    }
}

