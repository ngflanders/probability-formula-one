const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const resultsRouter = require('./routes/results');
const qualifyingRouter = require('./routes/qualifying');
const racesRouter = require('./routes/races');
const simsRouter = require('./routes/simulations');
const standingsRouter = require('./routes/standings');
const driversRouter = require('./routes/driver');

let app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/results', resultsRouter);
app.use('/qualifying', qualifyingRouter);
app.use('/races', racesRouter);
app.use('/simulations', simsRouter);
app.use('/standings', standingsRouter);
app.use('/driver', driversRouter);

module.exports = app;
