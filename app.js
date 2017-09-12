// const express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var mysql = require('mysql');

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mysql from 'mysql'

import config from './webpack.config.dev';
import webpack from 'webpack';
import serveStatic from 'serve-static';

const compiler = webpack(config);

import index from './routes/index';
import users from './routes/users';
import counsellors from './routes/counsellors';

var app = express();

// DB setup
const db = require('./db');
db.connect(db.MODE_DEVELOPMENT, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
  }
  else {
    console.log('WE ARE CONNECTED BABY');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
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
app.use('/', index);
app.use('/users', users);
app.use('/counsellors', counsellors);


app.get('*', function(req, res) {  
 //console.log('get route caught this');
 res.sendFile(path.join(__dirname, 'client', 'index.html')); 
});
app.use(express.static(path.join(__dirname, 'client', 'build')));



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

module.exports = app;