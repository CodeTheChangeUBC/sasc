/* 

Main file for setting up the application in a 
development environment 
=======
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mysql from 'mysql'
>>>>>>> 483f54e80e4a78954aec78a1da4030fb52980446

*/

const db = require('./db');
const testServer = require('./server.js');
var app = testServer.server(db,db.MODE_DEVELOPMENT);

module.exports = app;

