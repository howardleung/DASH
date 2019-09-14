import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CameraFeed } from './CameraFeed';

const handleImage = async file => {
  console.log(file);
  
}

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera_data: "",
    }
  }
  
  render() {
    return(
      <div className="Camera">
        <h1>test</h1>
        <CameraFeed sendFile={handleImage} />
      </div>
    )
  }
}

export default Camera;