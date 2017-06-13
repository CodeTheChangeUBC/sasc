
var UserMap = {}

UserMap['Counselor'] = {}
UserMap['Student'] = {}


class User {
  constructor (socket, type, obj) {
    UserMap[type] = obj
  }
}

module.exports = User