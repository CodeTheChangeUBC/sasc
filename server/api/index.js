const express = require('express');

const apiRouter = express.Router();

const messageController = require('../controllers/message');
const sessionController = require('../controllers/session');
const chatroomController = require('../controllers/chatroom');
const usersController = require('../models/user');

// testing, remove when done ---------------------------
// dummy post method works!
/*apiRouter.post('/register', (req, res) => {
  console.log('registering', req.body);
});*/
// -----------------------------------------------------



// testing, remove when done ---------------------------
// dummy post method works!
/*apiRouter.post('/login', (req, res) => {
  console.log('logging in', req.body);
})*/
// -----------------------------------------------------

apiRouter.post('/register', usersController.create);

apiRouter.post('/sessions', sessionController.createSession);
apiRouter.get('/sessions/:id', sessionController.counsellorGetSessions);

apiRouter.post('/chats', chatroomController.createChatroom);
apiRouter.get('/chats/:counsellorID', chatroomController.counsellorGetChatrooms);
apiRouter.post('/chats/messages', messageController.addMessage);
apiRouter.get('/chats/:chatroomID/messages', messageController.getMessages);

//apiRouter.post('/login', usersController.retrieve);

module.exports = apiRouter;