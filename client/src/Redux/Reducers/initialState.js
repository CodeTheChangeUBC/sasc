export default {
  auth: {},

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
     messages: [ { user: 'ChatBot', message: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'}, { user:'Scott Mescudi', message: 'Wait, what are these words?'} ]
     },
    { title: 'Come share your feelings',
     messages: [ {user: 'Scott Mescudi', message: 'Someone explain Sockets to me Please'}, {user: 'Q-Tip', message: 'I have no idea'}] 
    }
  ],

  activeRoom: {
    title: 'Music is Life',
    messages: [ { user: 'ChatBot', message: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'}, { user: 'Scott Mescudi', message: 'Wait, what are these words?'}]

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