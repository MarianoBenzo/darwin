import SocketIO from 'socket.io';
import {Server} from 'http';

export const init = (server: Server) => {
  const io = SocketIO(server);

  const heartbeat = () => {
    io.sockets.emit('heartbeat', 'heartbeat')
  };

  setInterval(heartbeat, 1000);

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


