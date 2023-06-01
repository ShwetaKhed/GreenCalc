function test(imageInput){
    console.log("diff life" + imageInput.files[0].name);
    var xhr = new XMLHttpRequest();
    var url = 'https://i0i4dmn6u6.execute-api.us-east-1.amazonaws.com/first-deployment/image-upload-bucket-ass2/test'; 

    xhr.open('PUT', url, true);

    // Create a new FormData object
    var formData = new FormData();
    formData.append('image', imageInput.files[0]);

    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // Request was successful
      var response = JSON.parse(xhr.responseText);
      console.log(response);
    } else {
      // Request failed
      console.error('Request failed with status:', xhr.status);
    }
  }
    };

xhr.send(formData);
}

function test2(imageInput){
  var url = 'https://4pcbjvvc7e.execute-api.us-east-1.amazonaws.com/v7/imagesavecloudsnap/test'; 

  var formData = new FormData();
  formData.append('image', imageInput.files[0]);

fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': '*/*'
  },
  body: formData
})
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    // Handle the successful response here
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle any errors that occurred during the request
  });
}