import webpackConfig from '../../webpack.config';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const socketIO = require("./socketIO.ts");

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
export const server = app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
/*
const initSocketIO = (server: Server) => {
  const io = SocketIO(server);

  io.on('connection', (socket) => {
    console.log('New connection: ', socket.id);

    socket.emit('news', {hello: 'world'});

    socket.on('my other event', (data) => {
      console.log('my other event: ', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
    });
  });
};
*/

// socket io
socketIO.init(server);
