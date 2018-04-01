
import User from './user'


class Counsellee extends User {

    constructor (socket) {
        super(socket)

        this._socket = socket
    } 
    
    
    socket () {
        return this._socket
    }
}

