/*
* created by waweru
* */

'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require("helmet");
const webpack = require('webpack');
const expressJWT = require('express-jwt');
const app = express();

const mongoURL = (process.env.NODE_ENV==='production') ? process.env.MONGODB_URL : 'mongodb://localhost:27017/zushar'
require('./src/zushar-api/lib/database')(mongoURL, {
  "db": {
    "native_parse": true
  },
  "server": {
    "poolSize": 15
  }
});

app.use(compression());
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));   
app.use(helmet.hidePoweredBy({ setTo: 'PHP 3.1.6' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());  
/*
* @desc:
*   webpack configuration
* */
if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('./webpack.config.js');
  const compiled = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(compiled, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiled));
}
app.use(express.static(path.join(__dirname, 'view/')) );
app.enable('trust proxy');

/*
* @desc:
*   all the front-end rendering routes
* */
app.all('/m/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, './view/zushar-main.html'));
});
app.all('/docs/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, './view/zushar-docs.html'));
});

/*
* @desc:
*   REST api
* */
const zusharApi = require('./src/zushar-api/index');
app.use('/api/', zusharApi);

/*
* @desc:
*   root '/'
* */
app.all('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, './view/zushar.html'));
});


/*
* @descs:
*   error handling
* */ 
app.use(function(req, res, next) {
  var err = new Error('Resource Not Found');
  err.status = 404;
  next(err);
});

if (process.env.NODE_ENV === 'production') {
    // #prodcution
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.send(err);
    });

}
if (process.env.NODE_ENV === 'development') {

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
          message: err.message,
          error: err
        });
    });

}

// console.log(path.join(__dirname, './dist/zushar-main.html'));
module.exports = app;