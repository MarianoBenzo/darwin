import SocketIO from 'socket.io';
import {Server} from 'http';

const World = require("../models/World.ts");
const WorldStatistics = require("../models/WorldStatistics.ts");

class SocketIOService {
  io: SocketIO.Server;

  init(server: Server) {
    this.io = SocketIO(server);
    this.onConnection();
    this.emitWorld();
    this.emitStatistics();
  }

  onConnection() {
    this.io.on('connection', (socket) => {
      console.log('New connection: ', socket.id);

      this.onDisconnect(socket);
    });
  }

  onDisconnect(socket: SocketIO.Socket) {
    socket.on('disconnect', () => {
      console.log('Disconnect: ', socket.id);
    });
  }

  emitWorld() {
    const emit = () => {
      this.io.sockets.emit('world', World);
    };
    setInterval(emit, 1000/45);
  }

  emitStatistics() {
    const emit = () => {
      const worldStatistics = new WorldStatistics(World);
      this.io.sockets.emit('world::statistics', worldStatistics);
    };
    setInterval(emit, 1000/10)
  }
}

module.exports = new SocketIOService();
