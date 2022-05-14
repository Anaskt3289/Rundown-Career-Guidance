var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const db = require('./Config/DB-Config')
require('dotenv').config()


var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var conversationRouter = require('./routes/conversation');
var messagesRouter = require('./routes/messages');
var mentorRouter = require('./routes/mentor');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.connect((err) => {
  if (err) console.log("Connection Error" + err);
  else console.log("Database connected");
})

app.use(cors())

app.use('/', usersRouter);
app.use('/admin', adminRouter);
app.use('/conversations',conversationRouter);
app.use('/messages',messagesRouter);
app.use('/mentor',mentorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
