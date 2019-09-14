import React, { Component } from 'react';
import { CameraFeed } from './CameraFeed';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera_data: null,
    }
  }
  
  handleImage = (file) => {
    console.log(file)
    this.camera_data = file;
    this.context.router.push("/"); // where it goes after Camera takes a pic
  }

  render() {
    return(
      <div className="Camera">
        <h1>test</h1>
        <CameraFeed sendFile={this.handleImage} />
      </div>
    )
  }
}

export default Camera;