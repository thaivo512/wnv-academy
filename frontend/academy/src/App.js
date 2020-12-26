import './App.scss';
import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import RouterConfig from './RouterConfig';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App" >
        <ToastContainer />
        <RouterConfig />
      </div >
    )
  }
}

export default App;
