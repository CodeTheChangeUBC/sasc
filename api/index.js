import express from 'express';

const apiRouter = express.Router();

//const usersController = require('../routes').users;
import usersController from '../models/user';
import auth from "../authenticator";

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

//apiRouter.post('/login', usersController.retrieve);

apiRouter.post("/loginuser", auth.issueTokenToUser);

apiRouter.post("/logincounsellor", auth.issueTokenToCounsellor);

export default apiRouter;