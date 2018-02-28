
import User from './user'


class Counsellor extends User {
    constructor (socket) {
        super(socket)

        this._patientQueue = []
    }

    /**
     * Sets up a basic connection to the patient
     * @param  {Patient} patient - the patient trying to connect
     */
    request (patient) {

        // Request a message 
        this.emit('request', patient.id)
        this._hook(patient)

        this._patientQueue.push(patient)
    }

    /**
     * Sets up local hooks for messages from patients
     * @param  {Patient} p - the patient to set listeners for
     */
    _hook (p) {

        // Relay messages from the patient
        p.socket.on('msg', data => {
            this.emit('msg', data)
        })
    }
}