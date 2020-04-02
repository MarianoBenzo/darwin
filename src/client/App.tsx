import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketService from "./services/SocketService";
import {Test} from "./components/Test";
import {Canvas} from "./components/Canvas";

const App = () => {
  return (
    <SocketService>
      <Test/>
      <Canvas/>
    </SocketService>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
