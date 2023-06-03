const express = require('express');
const app = express();
const multer = require('multer');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser');

var uploadedFileName = "";

const storage = multer.diskStorage({
  destination: __dirname + '/uploads/',
  filename: function (req, file, cb) {
    uploadedFileName = file.originalname;
    cb(null, file.originalname);
  }
});

app.use(bodyParser.json());
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
   axios.put('https://674az2l721.execute-api.us-east-1.amazonaws.com/v1/imageupload1/'+ uploadedFileName , imageData, {
  headers: {
    'Content-Type': 'image/jpeg'
  }
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

});

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

    axios.post('https://41pjl66n98.execute-api.us-east-1.amazonaws.com/production_search/search_by_image/', jsonData)
    .then(response => {
      console.log('Response:', response.data);
      res.status(200).json({
        message: response.data,
        posts: posts
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});



app.post('/api/searchTag', (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);

  axios.post('https://er1qgoymp1.execute-api.us-east-1.amazonaws.com/v1/multiple_tags', jsonData)
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

app.post('/api/deleteImage', (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);

  axios.post('https://ze7rwcqgj5.execute-api.us-east-1.amazonaws.com/v1', jsonData)
  .then(response => {
    console.log('Response:', response.data);
    res.status(200).json({
      message: "Image Deleted Successfully."
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

app.post('/api/updateTags', (req, res) => {
  const jsonData = req.body;
  console.log(jsonData);

  axios.post('https://zabv4z6ucf.execute-api.us-east-1.amazonaws.com/v1/updatee_tags', jsonData)
  .then(response => {
    console.log('Response:', response.data);
    res.status(200).json({
      message: "Tags Updated Successfully."
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

module.exports = app;
