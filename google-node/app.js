/**
 * Created : ashish8833
 * Email : ashishkadam83@gmail.com
 */
const app = require('express')();
const http = require('http').Server(app);
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const db = require('./config/db');
const cors = require('cors');

const user = require('./routes/v1/user');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(expressValidator());
//Application API Entry Point
app.use('/api/v1/user', user);
// Application Socket Entry Point
// require('./services/v1/socket/user.soket')(io);

http.listen(3005, () => console.log('Magic happens on port 3000'));
//"bcrypt": "^1.0.2",
//"bcrypt-nodejs": "0.0.3",
