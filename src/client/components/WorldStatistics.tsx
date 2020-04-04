import * as React from 'react';
import {useContext} from "react";
import {SocketContext} from "../services/SocketService";

const styles = require('./styles/test.scss');

export const WorldStatistics = () => {

  const {worldStatistics} = useContext(SocketContext);

  return (
    <div className={styles.container}>
      <div>World Statistics: </div>
      { worldStatistics &&
        <div>
          {worldStatistics.statistics.map((statistics, index) => {
            return <p key={index}>{`${statistics.text}: ${statistics.value}`}</p>
          })}
        </div>
      }
    </div>
  );
};
