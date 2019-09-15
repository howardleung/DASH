import React, { Component } from 'react';

export class CameraFeed extends Component {
  processDevices(devices) {
    devices.forEach(device => {
      console.log(device.label);
      this.setDevice(device);
    });
  }

  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  takePhoto = () => {
    const { sendFile } = this.props;
    const context = this.canvas.getContext('2d');
    console.log(context);
    //context.drawImage(this.videoPlayer, 0, 0, 680, 360);
    //sendFile(data);
    //this.canvas.toBlob(sendFile);
    this.canvas.
    this.canvas.toBlob(function(blob){
      var href = URL.createObjectURL(blob);
      console.log(blob);
      console.log(href);
    }, "image.png")
  };

  render() {
    return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer">
          <video ref={ref => (this.videoPlayer = ref)} width="680" height="360" />
        </div>
        <button onClick={this.takePhoto}>Take photo!</button>
        <div className="c-camera-feed__stage">
          <canvas width="680" height="360" ref={ref => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}
