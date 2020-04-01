import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketService from "./services/SocketService";
import {Test} from "./components/Test";

const styles = require('./style/index.css');

const App = () => {

  return (
    <SocketService>
      <div className={styles.container}>
        Darwin
        <Test/>
      </div>
    </SocketService>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
