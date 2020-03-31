import webpackConfig from '../webpack.config';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// initializing packages
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlwares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/api', (req, res) => {
  res.json({api: 'works!'});
});


// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
