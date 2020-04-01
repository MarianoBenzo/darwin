import * as React from "react";
import {useEffect, useState} from "react";
import * as io from "socket.io-client";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  socketId: string
}

export const SocketContext = React.createContext<SocketContextProps>({
  socketId: null
});

const SocketService = (props: Props) => {

  const {children} = props;

  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const socket = io();

    socket.on('connect', () => {
      console.log("socket: ", socket.id);
      setSocketId(socket.id)
    });

    socket.on('news', (data) => {
      console.log('news: ', data);
      socket.emit('my other event', { my: 'data' });
    });

    socket.on('heartbeat', (heartbeat) => {
      console.log('heartbeat: ', heartbeat);
    });
  };

  const context: SocketContextProps = {
    socketId: socketId
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketService;
