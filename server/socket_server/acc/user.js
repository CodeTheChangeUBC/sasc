
import Counsellor from './counsellor'
import Counsellee from './counsellee'


class User {
    constructor (socket, type) {
        this._socket = socket
    }

    
    emit (event, msg) {
        this._socket.emit(event, msg)
    }

    /**
     * Matches a counsellee to a free counsellor and creates the appropriate socket hooks
     * 
     * @param  {Counsellee} counsellee - A type of counsellee, extended from the user class
     */
    static match (counsellee) {
        // Aggregate and sort all the counsellor ids by amount of counsellees watching (ascending)
        var counsellorIds = Object.keys(this.Counsellor)

        counsellorIds.sort((a, b) => {
            // Using `this` because arrow function are non-binding
            var aCounsellees = this.Counsellor[a].counsellees.length
            var bCounsellees = this.Counsellor[b].counsellees.length

            return aCounsellees - bCounsellees
        })

        // The first Id is the most suitable counsellor
        // ergo, we request a chatd
        var selected = this.Counsellor[counsellorIds[0]]
        selected.request(counsellee)
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
            case 'COUNSELLEE':
                // Counsellees must be immediately matched to a counsellor.
                let user = new Counsellee(socket)
                this.Counsellees[socket.id] = user

                this.match(user)
                break
            case 'COUNSELLOR':
                // Counsellors do not need to connect to a counsellee right away.
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
User.Counsellees = {}

export default User
