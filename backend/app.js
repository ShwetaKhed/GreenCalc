const express = require('express');
const app = express();
const multer = require('multer');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser');
const http = require('http');

var uploadedFileName = "";

// To store images in upload folders
const storage = multer.diskStorage({
  destination: __dirname + '/uploads/',
  filename: function (req, file, cb) {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, -5);
    uploadedFileName = file.originalname;
    cb(null, file.originalname);
  }
});

// body parsing json
app.use(bodyParser.json());
// sending cors to browser
app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

const upload = multer({ storage: storage });

// upload files
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
   axios.put('https://674az2l721.execute-api.us-east-1.amazonaws.com/v1/imageupload1/'+ uploadedFileName , imageData, {
    headers: {
    'Content-Type': 'image/jpeg',
    'Authorization': req.headers['authorization']
    }
  })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

});

// upload image to search by tags
app.post('/api/uploadImageforTags',
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const posts = [
      {
        success : "True"
      }
    ]
    const filePath = path.join(__dirname, 'uploads', uploadedFileName)
    const imageData = fs.readFileSync(filePath);
    const base64Image = imageData.toString('base64');
    const jsonData = JSON.stringify({
      contents: base64Image
    });

    axios.post('https://41pjl66n98.execute-api.us-east-1.amazonaws.com/production_search/search_by_image/', jsonData,
    {
      headers: {
      'Authorization': req.headers['authorization']
      }
    })
    .then(response => {
      console.log('Response:', response.data);
      res.status(200).json({
        data: response.data
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


// search images by tags
app.post('/api/searchTag', (req, res) => {
  const jsonData = req.body;
  axios.post('https://er1qgoymp1.execute-api.us-east-1.amazonaws.com/v1/multiple_tags', jsonData,
  {
    headers: {
      'Authorization': req.headers['authorization']
    }
  })
  .then(response => {
    console.log('Response:', response.data);
    res.status(200).json({
      message: response.data
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// delete images
app.post('/api/deleteImage', (req, res) => {
  const jsonData = req.body;

  axios.post('https://kza0qvy3sf.execute-api.us-east-1.amazonaws.com/v1/delete', jsonData, {
    headers: {
      'Authorization': req.headers['authorization']
    }
  })
  .then(response => {
    console.log('Response:', response.data);
    res.status(200).json({
      message: response.data.message
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// update tags
app.post('/api/updateTags', (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);
  console.log(req.headers['authorization']);
  axios.post('https://zabv4z6ucf.execute-api.us-east-1.amazonaws.com/v1/updatee_tags', jsonData,
  {
    headers: {
      'Authorization': req.headers['authorization']
    }
  })
  .then(response => {
    console.log('Response:', response.data);
    res.status(200).json({
      data: response.data
    });
  })
  .catch(error => {
    res.status(200).json({
      data: "URL not found in the database."
    });
  });
});

module.exports = app;
