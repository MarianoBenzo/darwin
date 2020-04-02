import * as React from 'react';
import {useContext} from "react";
import {SocketContext} from "../services/SocketService";

const styles = require('./styles/test.scss');

export const Test = () => {

  const {socketId, world} = useContext(SocketContext);

  return (
    <div className={styles.container}>
      <div>Mi Socket Id: {socketId}</div>
      <div>
        <p>Sockets Ids: </p>
        {world && world.socketsIds.map((socketId, index) => {
          return <p key={index}>- {socketId}</p>
        })}
      </div>
    </div>
  );
};
