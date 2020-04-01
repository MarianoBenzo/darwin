import * as React from 'react';
import {useContext} from "react";
import {SocketContext} from "../services/SocketService";

export const Test = () => {
  const {socketId} = useContext(SocketContext);
  return <p>{socketId}</p>
};
