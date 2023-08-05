// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Example API endpoint to send data to the frontend
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from Node.js backend!' };
  console.log("resturn th")
  res.json(data);
});

// Add more API endpoints as needed for your application

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
