import React, { Component } from 'react';
import $ from 'jquery';
import keys from "./keys.json";
import cloudinary from 'cloudinary-core';
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';

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
      });

    //  var img = document.createElement("img");
    //  img.setAttribute("src", imgData);
    //  document.body.appendChild(img);


    // var result = fetch("https://api.cloudinary.com/v1_1/dashjeff/image/upload", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     file: "data:image/jpeg;base64,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zzzzzzzzzzzzzvSivzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzymzib/wA88888888888888888888888888888888888888va/888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888//EACARAQACAgEEAwAAAAAAAAAAAAEAESExUBBRkNFhofD/2gAIAQMBAT8Q8ou58E1xAW1CFaJ2x+oaDcSmuIMB6JtgUnDqm4YZya9eplq0TPb9uZA4hdIIKI+HlG//xAAkEQEAAgECBAcAAAAAAAAAAAABABExQVAQIZChYXGBkcHR8P/aAAgBAgEBPxDqiqGZ4kEcbQtFxkGXSX5TvHSVMoXtDzJ5HbgFIaq9nqVLs4OfTX7g5YPeHrT9iLW52jIRK38TmuXqjf/EACUQAQACAgEEAQQDAAAAAAAAAAEAESExUUFgYXGBkaGwwbHh8f/aAAgBAQABPxD8qHePaT+OCa5IXtKE+uvEVRVk/sQbfBaoJHOlGYst4cjYRws+PPaGw6mCHUsPoiHlhqPns9eA+XayzU+ODpzD0ROjyvhs5YOZMGIVcB/loEk8q3WfcREB5DD2fQdXUYTXa1ohK/WXDpgJ3RRzd3zZcVSi82g6EhCahxHU14XyYsTE2YBAo+HTs/Arkpmp9WOUg0/t0uQ3BQPAh76MPUdWltaif5RNiQ4UKQvnGdxnmXdnhLwpxLhk9ZrWcpgtYB6qEpbbmp5oOO4nlLgcmSIXP1AkSxAdQhviaKe2y7PHWmCswOr56xIjltvfVlehhMZeSJLRsBo55jfcLWnmvQO0SXOnmLEp5JhpjPRgUDlQwi7jz72m2QgNH4/J3//Z",
    //     upload_preset: "zwn6l5sw"
    //   }),
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })

    // var result = fetch("https://api.imgur.com/3/image", {
    //   method: "POST",
    //   headers:{
    //     'Authorization': "Bearer 5f8a684045be152",
    //     'Accept': "application/json", 
    //   },
    //   body: JSON.stringify({
    //     image: imgData
    //   })
    // })
    // console.log(result)

    // var apiUrl = 'https://api.imgur.com/3/image';
    // var apiKey = '0ada7a4ac1cbfb60edeb02652ef12adf0aee833e';

    // var settings = {
    //   async: false,
    //   crossDomain: true,
    //   processData: false,
    //   contentType: false,
    //   type: 'POST',
    //   url: apiUrl,
    //   headers: {
    //     Authorization: "Client-Id 5f8a684045be152",
    //     Accept: 'application/json'
    //   },
    //   mimeType: 'multipart/form-data'
    // };

    // var fd = new FormData();
    // fd.append('image', imgData);
    // settings.data = fd;

    // // Response contains stringified JSON
    // // Image URL available at response.data.link
    // $.ajax(settings).done(function(response) {
    //   console.log(response);
    // });



    // new Response(blob).arrayBuffer().then(buf => {
    //   console.log(buf);
    //   var result = fetch("https://api.cloudinary.com/v1_1/dashjeff/auto/upload", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       file: buf,
    //       upload_preset: keys.upload_preset
    //     }),
    //   });
    // });

  }
  //key = keys.azureAPI;
  //endpoint = "https://dashfaceapihtn.cognitiveservices.azure.com/face/v1.0";

  render() {
    return (
      <div className="Analyze">
      </div>
    )
  }
}

export default Analyze;