export default {
  auth: {},

  chat: {
    connected: false
  },

  messages: [
    { user: 'ChatBot',
      message: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'
    }, 
    { user: 'Mac Miller',
      message: 'I tots agree'
    },
    { user: 'Scott Mescudi',
      message: '!!!!!!!!!!!!!!!! I feel immortal'
    } 
  ],
  
  rooms: [
    { title: 'Music is Life', 
      humans: {
        counsellor: {
          ID: 1,
          email: "meanieblue@example.com",
          firstName: "Meanie",
          lastName: "Blue"
        },
        user: {
          ID: 11,
          username: "beantdonethat",
          nickname: "Bean",
          age: 0,
          email: "beantdonethat@example.com",
          phoneNumber: 1234567890
        },
      },
     messages: [
     {
      ID: 1,
      sessionID: 1,
      messageTime: 100,
      counsellorID: 1,
      userID: 1,
      message: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io',
      fromCounsellor: 1,
      fromTwilio: 0,
      user: 'ChatBot'
     },
     {
      ID: 2,
      sessionID: 2,
      messageTime: 200,
      counsellorID: 1,
      userID: 1,
      message: 'Wait, what are these words?',
      fromCounsellor: 0,
      fromTwilio: 0,
      user: 'Scott Mescudi'
     }
    ] },
    {
      title: 'Come share your feelings',
      humans: {
      counsellor: {
        ID: 2,
        email: "scottmescudi@example.com",
        firstName: "Scott",
        lastName: "Mescudi"
      },
      user: {
        ID: 12,
        username: "fox",
        nickname: "Q-Tip",
        age: 0,
        email: "foxTheQuiet@example.com",
        phoneNumber: 1234567891
      }
    },
     messages: [
     {
      ID: 3,
      sessionID: 3,
      messageTime: 100,
      counsellorID: 2,
      userID: 12,
      user: "Scott",
     message: 'Someone explain Sockets to me Please',
     fromCounsellor: 1,
     fromTwilio: 0
   },
   {
    ID: 4,
    sessionID: 3,
    messageTime: 200,
    counsellorID: 2,
    userID: 12,
    user: 'Q-Tip',
    message: 'I have no idea',
    fromCounsellor: 0,
    fromTwilio: 0
  }] 
    }
  ],

  activeRoom: {
    room: {
    title: 'Music is Life',
    humans: {
      counsellor: {
        ID: 1,
        email: "meanieblue@example.com",
        firstName: "Meanie",
        lastName: "Blue"
      },
      user: {
        ID: 11,
        username: "beantdonethat",
        nickname: "Bean",
        age: 0,
        email: "beantdonethat@example.com",
        phoneNumber: 1234567890
      }
    },
    //messages: [ { user: 'ChatBot', messageContent: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'}, { user: 'Scott Mescudi', messageContent: 'Wait, what are these words?'}]
    messages: [
    {
      ID: 1,
      sessionID: 1,
      messageTime: 100,
      counsellorID: 1,
      userID: 11,
      message: 'Hi Bean.',
      fromCounsellor: 1,
      fromTwilio: 0,
      user: "Meanie"
    },
    {
      ID: 2,
      sessionID: 1,
      messageTime: 200,
      counsellorID: 1,
      userID: 11,
      message: 'Hi Meanie Blue.',
      fromCounsellor: 0,
      fromTwilio: 0,
      user: "Bean"
     }
    ]
  }
  },

  counsellor: {
    counsellor: {
      ID: "153",
      firstName: "Shilo",
      lastName: "St. Cyr",
      email: "admin@ams.ubc.ca"
    },
    students: [
      {name: "John Doe", phone: "(604) 111-1111", email: "John.Doe@yahoo.com" },
      {name: "Jane Doe", phone: "(604) 111-1111", email: "Jane.Doe@yahoo.com" },
      {name: "Tommy Chuk", phone: "(604) 777-7777", email: "tchuk@hotmail.com" },
      {name: "Sabrina", phone: "(604) 777-7777", email: "sabrina@protonmain.ch" },
      {name: "Bradly", phone: "(604) 777-7777", email: "bradly@protonmain.ch" }
    ]
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
      registered: 0,
    },
    error: ""
  },

  smssettings: {
    sms: {
      email: "",
      twilioPhoneNumber: "",
      accountSid: "",
      authToken: ""
    },
    error: ""
  }

};