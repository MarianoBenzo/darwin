import SocketIO from 'socket.io';
import {Server} from 'http';
//import Socket = SocketIO.Socket;
//import SocketIOServer = SocketIO.Server;

const World = require("../models/World.ts").default;

class SocketIOService {
  io: any;

  init(server: Server) {
    this.io = SocketIO(server);
    this.onConnection();
    this.emitWorld();
  }

  onConnection() {
    this.io.on('connection', (socket) => {
      console.log('New connection: ', socket.id);
      World.addSocketId(socket.id);

      this.onDisconnect(socket);
    });
  }

  onDisconnect(socket: any) {
    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
    });
  }

  emitWorld() {
    const emit = () => {
      this.io.sockets.emit('world', World);
      World.update();
    };
    setInterval(emit, 1000/60);
  }
}

export default new SocketIOService();
