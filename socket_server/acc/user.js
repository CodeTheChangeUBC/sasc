
var UserMap = {}

UserMap['Counselor'] = {}
UserMap['Student'] = {}


class User {
  constructor (socket, type, obj) {
    UserMap[type][socket.id] = obj
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
      UserMap.Counselor[a].convos.length - UserMap.Counselor[b].convos.length
    })[0]

    return UserMap.Counselor[c_id]
  }
}

module.exports = User