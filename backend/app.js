// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
var data = "";

app.use(bodyParser.json());
app.use(cors());

const sql = require('mssql');

const config = {
    user: 'rtik0001',
    password: 'Mavericks1!',
    server: 'ta04emissions.database.windows.net',
    port: 1433,
    database: 'TA04',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

app.get('/api/data', async (req, res) => {
  try {
    // Perform asynchronous operations here
    const data = await connectAndQuery();
    console.log(data);
    timeout();
    console.log(JSON.stringify(data, null, 2));
    res.sendStatus(200)
    res.json(data);
  } catch (error) {
    // Handle errors here if necessary
    res.status(500).json({ error: 'Something went wrong' });
  }
});

async function connectAndQuery() {
  try {
      var poolConnection = await sql.connect(config);

      console.log("Reading rows from the Table...");
      const result = await sql.query`SELECT  * FROM emissions_vf`;
      data = result.recordset;
      poolConnection.close();
      return data;
  } catch (err) {
      console.error(err.message);
  }
}

async function timeout() {
  console.log("Start");
  await sleep(100000); // Sleep for 2000 milliseconds (2 seconds)
  console.log("End");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
