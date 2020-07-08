var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const locationRouter = require('./routes/location');
const lightRouter = require('./routes/light');
const stepRouter = require('./routes/step');
const activityRouter = require('./routes/activity');
const accelerometerRouter = require('./routes/accelerometer');
const generalRouter = require('./routes/general');
const dataRouter = require('./routes/data');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'data/general')));


app.use('/data', dataRouter);
app.use('/location', locationRouter);
app.use('/light', lightRouter);
app.use('/step', stepRouter);
app.use('/activity', activityRouter);
app.use('/accelerometer', accelerometerRouter);
app.use('/general', generalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
