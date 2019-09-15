import $ from 'jquery'; 

function processEmotion(file) 
{
  // Replace <Subscription Key> with your valid subscription key.
  var subscriptionKey = "638ab7d1c3c2427a8fa04be41b228d7f";
  var uriBase = "https://canadacentral.api.cognitive.microsoft.com/face/v1.0/detect";
  
  // Request parameters.
  var params = {
    "returnFaceAttributes":
    "emotion"
  };

  // Display the image.
  var sourceImageUrl = URL.createObjectURL(file);
 // var sourceImageUrl = file.value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  
  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',

  })
  
  .done(function(data) 
    {  
    // Show formatted JSON on webpage.
    var emotion = getEmotion(data[0].faceAttributes.emotion);
    return emotion;
    })
};



function getEmotion(emotionObject)
{
  var max = 0;
  for (var emotion in emotionObject){
    if (emotionObject[emotion] > max){
      var trueEmotion = emotion;
      max = emotionObject[emotion];
    }
  }
  return trueEmotion;
};