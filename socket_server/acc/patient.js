

class Patient {
    constructor (socket) {
        this.start = Date.now()
        this.socket = socket

        this.partner = this._connect()
    }

    _connect () {
        /** TODO: Find an appropriate counselor and connect. */
    }

    release () {
        /** TODO: Record the session to the DB here. */
    }

    relay (data) {
        /** TODO: Send the message to the partner. */
    }
}

module.exports = Patient
