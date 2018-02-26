
import Counsellor from './counsellor'
import Patient from './patient'

class User {
    constructor (socket, type, obj) {
        this[type] = obj
    }

    send () {
        /* TODO: Check Trello */
    }

    onRecieve () {
        /* TODO: Check Trello */
    }
    
    /**
     * Attempts to match the patient with a counsellor
     */
    static match () {

    }

    /**
     * Creates a user via their socket payload and adds
     *     them to an appropriate collection
     *     
     * @param {Socket} socket - The incoming socket
     */
    static add (socket) {
        // Detect payload user type and create the proper user type
        switch (socket.payload) {
            case 'PATIENT':
                this.Patients[socket.id] = new Patient(socket)
                break
            case 'COUNSELLOR':
                this.Counsellors[socket.id] = new Counsellor(socket)
                break
            default:
                console.warn(`Invalid socket user type: ${socket.payload}`)
                return
                break
        }
    }
}


User.Counsellors = {}
User.Patients = {}

export default User
