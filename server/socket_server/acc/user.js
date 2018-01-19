

//var Patient = require('./patient')


//class User {

  /**
   * Creates a user based on the socket.data data.
   * @param  {Socket} socket - The Socket.io socket.
   * @return {User}          - Returns a user either a counselor or patient.
   */
  /*static create (socket) {
    var user

    switch (socket.data.type) {
      case 'COUNSELOR':
        user = new Counselor(socket)
      break
      case 'PATIENT':
        user = new Patient(socket)
      break
    }

    // Add it to the global map.
    this.users[socket.id] = user

    return user
  }
}

User.users = {}



module.exports = User*/

var UserMap = {};

UserMap['Counselor'] = {};
UserMap['Student'] = {};


class User {
  constructor (socket, type, obj) {
    UserMap[type][socket.id] = obj;
  }

  /**
   * Searches the CounselorMap for a user
   * @param  {Student} student - A student object
   * @return {Counselor}
   */
  static find (student) {
    // This could be optimized.
    // Essentially, it creates an array of keys from the UserMap.Counselor Object
    // then sorts the keys based on the smallest conversation array length
    // then returns the smallest one.
    
    var c_id = Object
    .keys(UserMap.Counselor)
    .sort((a,b) => {
      UserMap.Counselor[a].convos.length - UserMap.Counselor[b].convos.length;
    })[0];

    return UserMap.Counselor[c_id];
  }
}

module.exports = User;