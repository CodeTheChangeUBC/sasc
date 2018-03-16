
import User from './user'


class Counsellor extends User {
    constructor (socket) {
        super(socket)

        // For counsellees that haven't been accepted yet
        this._counselleeQueue = []

        // For counsellees that have been accepted, meant for relaying
        this._counsellees = {}

        socket
            .on('counsellees', data => {
                let keys = Object.keys(this._counsellees)

                this.emit(keys)
            })
            .on('msg', packet => {
                let counselleeKey = packet.to
                let counsellee = this._counsellees[counselleeKey]

                counsellee.send(packet.msg)
            })
    }

    /**
     * Sets up a basic connection to the counsellee
     * @param  {Counsellee} counsellee - the counsellee trying to connect
     */
    request (counsellee) {

        // Request a message 
        this.emit('request', counsellee.id)
        this._hook(counsellee)

        this._counselleeQueue.push(counsellee)
    }

    /**
     * Sets up local hooks for messages from counsellees
     * @param  {Counsellee} p - the counsellee to set listeners for
     */
    _hook (p) {

        // Relay messages from the counsellee
        p.socket.on('msg', data => {
            this.emit('msg', data)
        })
    }
}

