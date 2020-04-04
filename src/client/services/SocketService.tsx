import * as React from "react";
import {useEffect, useState} from "react";
import * as io from "socket.io-client";
import CanvasService from "./CanvasService";
import {World} from "../models/World";
import WorldStatistics from "../models/WorldStatistics";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  worldStatistics: WorldStatistics;
}

export const SocketContext = React.createContext<SocketContextProps>({
  worldStatistics: null
});

const SocketService = (props: Props) => {

  const {children} = props;

  const [worldStatistics, setWorldStatistics] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const socket = io();

    socket.on('connect', () => {

      socket.on('world', (world: World) => {
        CanvasService.drawWorld(world);
      });

      socket.on('world::statistics', (worldStatistics: WorldStatistics) => {
        setWorldStatistics(worldStatistics);
      });
    });
  };

  const context: SocketContextProps = {
    worldStatistics: worldStatistics
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketService;
