/* 

Main file for setting up the application in a 
development environment 

*/

const db = require('./db');
const testServer = require('./server.js');
var app = testServer.server(db,db.MODE_DEVELOPMENT);

module.exports = app;

