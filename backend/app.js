const express = require('express');
const app = express();
const multer = require('multer');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const fs = require('fs');

var uploadedFileName = "";

const storage = multer.diskStorage({
  destination: __dirname + '/uploads/',
  filename: function (req, file, cb) {
    uploadedFileName = file.originalname;
    cb(null, file.originalname);
  }
});


app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

const upload = multer({ storage: storage });


app.post('/api/upload',
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const posts = [
      {
        success : "True"
      }
    ]
    res.status(200).json({
      message: "Image Uploaded Successfully",
      posts: posts
    });
    const filePath = path.join(__dirname, 'uploads', uploadedFileName)


    const imageData = fs.readFileSync(filePath);
    // Make the PUT request
   axios.put('https://674az2l721.execute-api.us-east-1.amazonaws.com/v1/imageupload1/'+ uploadedFileName , imageData, {
  headers: {
    'Content-Type': 'image/jpeg' // Replace with the appropriate content type of your image
  }
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

});



app.use('/api/uploadfile' ,(req,resp,next) => {
  const posts = [
    {
      success : "True"
    }
  ]
   resp.status(200).json({
    message: "Upload success",
    posts: posts
  });
});

module.exports = app;
