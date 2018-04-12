export default {

  auth: {
    auth: "",
    status: {
      error: "",
      success: ""
    },
  },

  chat: {
    connected: false
  },
  
  room: {
    activeRoom: null,
    rooms: [{ 
      roomID: 1,
      sessionID: 0, // Latest session ID
      humans: {
          counsellor: 1,
          user: 11,
        },
       messages: [
       {
        ID: 1,
        sessionID: 1,
        messageTime: 100,
        counsellorID: 1,
        userID: 1,
        messageContent: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io',
        fromCounsellor: 1,
        fromTwilio: 0
       },
       {
        ID: 2,
        sessionID: 2,
        messageTime: 200,
        counsellorID: 1,
        userID: 1,
        message: 'Wait, what are these words?',
        fromCounsellor: 0,
        fromTwilio: 0
       }
      ] },
      {
        roomID: 2,
        sessionID: 1,
        humans: {
        counsellor: 2,
        user: 12
      },
       messages: [
       {
        ID: 3,
        sessionID: 3,
        messageTime: 100,
        counsellorID: 2,
        userID: 12,
       messageContent: 'Someone explain Sockets to me Please',
       fromCounsellor: 1,
       fromTwilio: 0
     },
     {
      ID: 4,
      sessionID: 3,
      messageTime: 200,
      counsellorID: 2,
      userID: 12,
      messageContent: 'I have no idea',
      fromCounsellor: 0,
      fromTwilio: 0
    }] 
      }
    ],
  },

  user: {
    user: {
      ID: "",
      firstName: "",
      lastName: "",
      username: "",
      age: 0,
      email: "",
      gender: "",
      nickname: "",
      phoneNumber: "",
      registered: 0
    },
    status: {
      error: "",
      success: ""
    }
  },

  counsellor: {
    counsellor: {
      ID: "153",
      firstName: "Admin",
      lastName: "Chat",
      email: "admin@example.com",
      students: [
        {name: "John Doe", phone: "(604) 111-1111", email: "John.Doe@yahoo.com" },
        {name: "Jane Doe", phone: "(604) 111-1111", email: "Jane.Doe@yahoo.com" },
        {name: "Tommy Chuk", phone: "(604) 777-7777", email: "tchuk@hotmail.com" },
        {name: "Sabrina", phone: "(604) 777-7777", email: "sabrina@protonmain.ch" },
        {name: "Bradly", phone: "(604) 777-7777", email: "bradly@protonmain.ch" }
      ]
    },
    status: {
      error: "",
      success: ""
    }
  },

  sms: {
    sms: {
      email: "",
      twilioPhoneNumber: "",
      accountSid: "",
      authToken: ""
    },
    status: {
      error: "",
      success: ""
    }
  }

};