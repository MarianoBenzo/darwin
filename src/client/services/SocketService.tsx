import * as React from "react";
import {useEffect, useState} from "react";
import * as io from "socket.io-client";
import CanvasService from "./CanvasService";
import {World} from "../models/World";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  socketId: string
  world: World;
}

export const SocketContext = React.createContext<SocketContextProps>({
  socketId: null,
  world: null
});

const SocketService = (props: Props) => {

  const {children} = props;

  const [socketId, setSocketId] = useState(null);
  const [world, setWorld] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const socket = io();

    socket.on('connect', () => {
      console.log("socket: ", socket.id);
      setSocketId(socket.id);

      socket.on('world', (world: World) => {
        setWorld(world);
        CanvasService.drawWorld(world);
      });
    });
  };

  const context: SocketContextProps = {
    socketId: socketId,
    world: world
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketService;
