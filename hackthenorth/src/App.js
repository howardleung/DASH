import React, { Component } from 'react';
import Camera from './Camera'
import './App.css';

// for now app just instantiates a camera
// we want app to the controller that first prompts login,
// then routes to camera then routes to the chat, etc.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera_data: "",
    }
  }

  render() {
    return (
      <div className="App">
        <Camera {...this.props} />
      </div>
    )
  }
}

export default App;

