
import Counsellor from './counsellor'
import Patient from './patient'


class User {
    constructor (socket, type, obj) {
        this[type] = obj
    }

    /**
     * Attempts to match the patient with a counsellor
     */
    static match () {
    }
}


User.Counsellors = {}
User.Patients = {}

export default User
