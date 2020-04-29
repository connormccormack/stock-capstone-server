const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const portfoliosRouter = require('./portfolios/portfolios-router');
const assetsRouter = require('./portfolios/assets-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors(
  // { origin: CLIENT_ORIGIN }
));

app.use('/api/portfolios', portfoliosRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;