import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketService from "./services/SocketService";
import {WorldStatistics} from "./components/WorldStatistics";
import {Canvas} from "./components/Canvas";

const App = () => {
  return (
    <SocketService>
      <WorldStatistics/>
      <Canvas/>
    </SocketService>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
