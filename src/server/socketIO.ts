import SocketIO from 'socket.io';
import {Server} from 'http';

const World = require("./darwin/world.ts").default;

export const init = (server: Server) => {
  const io = SocketIO(server);

  const emitWorld = () => {
    io.sockets.emit('world', World);
    World.update()
  };

  setInterval(emitWorld, 1000/60);

  io.on('connection', (socket) => {
    console.log('New connection: ', socket.id);

    World.addSocketId(socket.id);

    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
    });
  });
};


