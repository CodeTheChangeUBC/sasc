
import Counsellor from './counsellor'
import Patient from './patient'


class User {
    constructor (socket, type) {
        this._socket = socket
    }

    
    send (event, msg) {
        this._socket.emit(event, msg)
    }

    /**
     * Matches a patient to a free counsellor and creates the appropriate socket hooks
     * 
     * @param  {Patient} patient - A type of patient, extended from the user class
     */
    static match (patient) {
        // Aggregate and sort all the counsellor ids by amount of patients watching (ascending)
        var counsellorIds = Object.keys(this.Counsellor)

        counsellorIds.sort((a, b) => {
            // Using `this` because arrow function are non-binding
            var aPatients = this.Counsellor[a].patients.length
            var bPatients = this.Counsellor[b].patients.length

            return aPatients - bPatients
        })

        // The first Id is the most suitable counsellor
        // ergo, we request a chatd
        var selected = this.Counsellor[counsellorIds[0]]
        selected.request(patient)
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
                .// Patients must be immediately matched to a counsellor.
                let user = new Patient(socket)
                this.Patients[socket.id] = user

                this.match(user)
                break
            case 'COUNSELLOR':
                // Counsellors do not need to connect to a patient right away.
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
