var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store');
var templatesRouter = require('./routes/templates');
var authedRouter = require('./routes/authed');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var rateLimiterMiddleware = require('./models/middleWave/rateLimite');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/templates', templatesRouter);
app.use('/auth', authedRouter);
app.use('/admin', adminRouter);
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Hello中原' });
});
app.use(rateLimiterMiddleware);
app.use('/member', indexRouter);
app.use('/store', storeRouter);
app.use('/users', usersRouter);

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