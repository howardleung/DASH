import React, { Component } from 'react';
import fire from './config/Fire'

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

function base64ToArrayBuffer(base64) {
  console.log(base64);
  base64 = base64.replace(/^data:image\/[a-z]+;base64,/, "");
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}


class Analyze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emID: null
    };

    var imgData = this.props.location.state.img_data;
    //console.log(imgData);

    //var blob = dataURItoBlob(imgData);
    //console.log(blob)

    var bin = base64ToArrayBuffer(imgData);
    console.log(bin);

    var result = fetch("https://faceanalysisstuff.cognitiveservices.azure.com/face/v1.0/detect?returnFaceAttributes=emotion", {
      method: "POST",
      headers:{
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '67ef477d985b4a27b8b8396ef9370a01'
      },
      body: bin,
    })
      .then(res => res.json())
      .then(res => { 
        console.log(res);
        var max = 0;
        var emotionObject = res[0].faceAttributes.emotion;
        for (var emotion in emotionObject){
          if (emotionObject[emotion] > max) {
            console.log(emotionObject[emotion]);
            var trueEmotion = emotion;
            max = emotionObject[emotion];
          }
        }
        var emotionID
        if (trueEmotion == "anger") emotionID = 0;
        if (trueEmotion == "contempt") emotionID = 0;
        if (trueEmotion == "disgust") emotionID = 0;
        if (trueEmotion == "fear") emotionID = 1;
        if (trueEmotion == "happiness") emotionID = 2;
        if (trueEmotion == "neutral") emotionID = 3;
        if (trueEmotion == "sadness") emotionID = 1;
        if (trueEmotion == "surprise") emotionID = 2;
        this.setState({
          emID: emotionID
        }, this.finishedState);
        this.updateDB(trueEmotion);
      });
  }

  finishedState = (e) => {
    this.props.history.push({
      pathname: "/Home",
      state: {updateDB: true}
    });
  }

  updateDB(par){
    var userId = fire.auth().currentUser.uid;
    fire.database().ref('/users/' + userId).once('value').then(snap => {
        var newAr = snap.val().emo;
        newAr.unshift(par);
        fire.database().ref('users/' + userId).set({
          emo: newAr,
          chatting: snap.val().chatting,
          history: snap.val().history,
        });
      });
  }

  render() {
    return (
      <div className="Analyze">
      </div>
    )
  }
}

export default Analyze;