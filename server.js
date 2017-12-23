/* 

This file contains all the server settings for the application. 
It can be setup using a development or test db. 
It should either be called from app.js or app_test.js

*/

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const apiRouter = require('./server/api/index');

const config = require('./webpack.config.dev');
const webpack = require('webpack');
const serveStatic = require('serve-static');

const compiler = webpack(config);

const router = require('./server/routes/index');
const users = require('./server/routes/users');
const twilio = require('./server/routes/twilio');
const counsellors = require('./server/routes/counsellors');
const auth = require('./server/routes/authentication');

var app = express();

exports.server = function(database, databaseMode) {
  // DB setup
  database.connect(databaseMode, function(err) {
    if (err) {
      console.log('Unable to connect to MySQL.');
    }
    else {
      console.log('WE ARE CONNECTED TO THE DB BABY');
    }
  });

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  const staticPath = path.join(__dirname, '/client');

  app.use(serveStatic(staticPath));

  app.use('/', router);
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/counsellors', counsellors);
  app.use('/twilio', twilio);

  // adding apiRouter for login and registration
  app.use('/api', apiRouter);

  app.get('*', function(req, res) {  
   //console.log('get route caught this');
   res.sendFile(path.join(__dirname, '/client', 'index.html')); 
  });
  app.use(express.static(path.join(__dirname, '/../client', 'build')));



  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
}
