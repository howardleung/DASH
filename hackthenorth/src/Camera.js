import React from 'react';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
//import { saveJobImage } from '../actions'

class Camera extends React.Component {
  state = { // store base 64 encoded image value to imageData
    imageData: null,
    image_name: "",
    saveImage: false
  }

  setRef = (webcam) => { // activate webcam
    this.webcam = webcam;
  }

  capture = () => { // capture the image
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageData: imageSrc
    })
  };

  onClickRetake = (e) => { // retake if not satisfied
    e.persist();
    this.setState({
      imageData: null
    })
  }

  onClickSave = (e) => { // change the saveImage state so we can turn off webcam after picture with a conditional statement
    e.persist();
    this.setState((previousState) => {
      return {
        saveImage: !previousState.saveImage
      }
    });
  }

  handleChange = (e) => { // user to input filename if wanna use the form
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSaveSubmit = (e) => {
    // var img = document.createElement("img");
    // img.setAttribute("src", this.state.imageData);
    // document.body.appendChild(img);

    this.props.history.push({
      pathname: "/analyze",
      state: { img_data: this.state.imageData }
    });

    // e.preventDefault();
    // let imageObject = {
    //   image_name: this.state.image_name,
    //   job_id: this.props.job.id,
    //   image_data: this.state.imageData
    // }
    // this.props.saveJobImage(imageObject)
  }

  // saveForm = () => {
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSaveSubmit}>
  //         <p>
  //           <label>Image name: </label>
  //           <input type="text"
  //             name="image_name"
  //             value={this.state.image_name}
  //             onChange={this.handleChange} />
  //             <input type="submit" value="Save" />
  //         </p>
  //       </form>
  //     </div>
  //   )
  // }

  render() {
    const VideoConstraints = {
      width: 4096, //1280,
      height: 4096, // 720,
      facingMode: 'user',
    };

    return (
      <div>
        <Webcam // this component takes in parameters to adjust height, width, format
          audio={false}
          height={500}
          ref={this.setRef}
          screenshotFormat="image/png"
          width={500}
          videoConstraints={VideoConstraints} // stores saved image parameters and which camera to use
        />
        <div className="button-container"><button onClick={this.capture}>Capture photo</button></div>
        {this.state.imageData ?
          <div>
            <p><img src={this.state.imageData} alt="" /></p>
            <span><button onClick={this.onClickRetake}>Retake?</button></span>
            <span><button onClick={this.onClickSave}>Save</button></span>
            { /* this.state.saveImage ? this.saveForm() : null */}
            {this.state.saveImage ? this.handleSaveSubmit() : null}
          </div>
          : null}
      </div>
    );
  }

}

export default Camera;

// import React, { Component } from 'react';
// import { CameraFeed } from './CameraFeed';

// class Camera extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       camera_data: null,
//     }
//   }

//   handleImage = (file) => {

//     var img = document.createElement("img");
//     img.setAttribute("src", window.URL.createObjectURL(file));
//     document.body.appendChild(img);

//     //console.log(file);
//     //arrayBuf = 
//     // this.props.history.push({
//     //   pathname: "/analyze",
//     //   state: { img_data: file }
//     // });
//   }

//   render() {
//     return(
//       <div className="Camera">
//         <h1>test</h1>
//         <CameraFeed sendFile={this.handleImage} />
//       </div>
//     )
//   }
// }

// export default Camera;